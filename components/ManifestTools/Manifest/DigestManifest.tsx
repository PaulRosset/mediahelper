import { createRef, Component, RefObject } from "react";
import RxPlayer from "rx-player";
import Shaka from "shaka-player";
import { parse as VideoJSMPDParser } from "mpd-parser";
import { Parser as VideoJSM3U8Parser } from "m3u8-parser";
import { getTransportFromUrl } from "../../../utils/getTransportFromUrl";

import { Info } from "../../Widgets/Info";
import { Title } from "../../Widgets/Title";
import { Displayer } from "./Displayer";

interface IProps {}

interface IState {
  error: string | null;
  manifest: { [key: string]: unknown } | null;
  isLoading: boolean;
  playerChoice: "shaka" | "rxp" | "videojs";
}

class DigestManifest extends Component<IProps, IState> {
  refByURLInput: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);

    this.refByURLInput = createRef<HTMLInputElement>();

    this.state = {
      error: null,
      manifest: null,
      isLoading: false,
      playerChoice: "shaka",
    };
  }

  onChangePlayerChoice = (evt: any) => {
    this.setState({
      playerChoice: evt.target.name,
    });
  };

  onGetByURLValue = (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return;
    }
    this.setState({ error: null, manifest: null });
    const url = this.refByURLInput.current?.value ?? "";
    if (url === "") {
      return;
    }
    this.setState({
      isLoading: true,
    });
    try {
      const transport = getTransportFromUrl(url);
      const { playerChoice } = this.state;
      if (playerChoice === "shaka") {
        const retryParameters = {
          maxAttempts: 1,
        };
        const dash = {
          xlinkFailGracefully: false,
        };
        const hls = {
          useFullSegmentsForStartTime: true,
        };
        const networkEngine = new Shaka.net.NetworkingEngine();
        networkEngine.RequestType =
          Shaka.net.NetworkingEngine.RequestType.MANIFEST;
        const playerInterface = {
          networkingEngine: networkEngine,
          makeTextStreamsForClosedCaptions: () => true,
          filter: () => false,
        };
        if (transport === "dash") {
          const dashParser = new Shaka.dash.DashParser();
          dashParser.configure({ retryParameters, dash });
          dashParser.start(url, playerInterface).then((manifest: any) => {
            this.setState({
              manifest,
            });
          });
        } else if (transport === "hls") {
          const hlsParser = new Shaka.hls.HlsParser();
          hlsParser.configure({ retryParameters, hls });
          hlsParser.start(url, playerInterface).then((manifest: any) => {
            this.setState({
              manifest,
            });
          });
        } else {
          this.setState({
            error:
              "Only HLS or DASH protocol are supported for the shaka-player.",
          });
        }
      } else if (playerChoice === "rxp") {
        if (!["dash", "smooth"].includes(transport)) {
          this.setState({
            error:
              "Only dash and smooth protocol are supported atm for the rx-player.",
          });
        }
        const player = new RxPlayer();
        player.addEventListener("error", (err) => {
          console.warn(err.message);
          this.setState({ error: err.message });
        });
        player.addEventListener("playerStateChange", (evt) => {
          const manifest = (player as any)._priv_lastContentPlaybackInfos
            .manifest;
          if (this.state.manifest === null && manifest) {
            console.warn(evt, manifest);
            this.setState(
              {
                manifest,
              },
              () => {
                player.dispose();
              }
            );
          }
        });
        player.loadVideo({
          transport,
          url,
        });
      } else if (playerChoice === "videojs") {
        if (transport === "dash") {
          fetch(url)
            .then((res) => res.text())
            .then((manifestFetched) => {
              const parsedManifest = VideoJSMPDParser(manifestFetched, {
                manifestUri: url,
              });
              this.setState({ manifest: parsedManifest });
            })
            .catch((err) => {
              this.setState({ error: err.message });
            });
        } else if (transport === "hls") {
          fetch(url)
            .then((res) => res.text())
            .then((manifestFetched) => {
              const parser = new VideoJSM3U8Parser();
              parser.push(manifestFetched);
              parser.end();
              this.setState({ manifest: parser.manifest });
            })
            .catch((err) => {
              this.setState({ error: err.message });
            });
        } else {
          this.setState({
            error: "Only HLS or DASH protocol are supported for video.js.",
          });
        }
      }
      this.setState({
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <div className="widget-container">
        <div className="widget-header">
          <Title text="Manifest Inspector" anchor="manifestInspector" />
          <Info url="https://dashif.org/guidelines/" />
        </div>
        <div>
          <div className="ingest-container">
            <div className="player-choice">
              <div>
                <input
                  type="radio"
                  id="shaka"
                  name="shaka"
                  onChange={this.onChangePlayerChoice}
                  checked={this.state.playerChoice === "shaka"}
                />
                <label htmlFor="shaka">Shaka player</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="rxp"
                  name="rxp"
                  onChange={this.onChangePlayerChoice}
                  checked={this.state.playerChoice === "rxp"}
                />
                <label htmlFor="rxp">rx-player</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="videojs"
                  name="videojs"
                  onChange={this.onChangePlayerChoice}
                  checked={this.state.playerChoice === "videojs"}
                />
                <label htmlFor="videojs">video.js</label>
              </div>
              <span className="info">
                Manifest intermediate representation (Hls|Dash|Smooth)
              </span>
            </div>
            <div className="ingest-input-container">
              <label htmlFor="segmentUrl">By URL:</label>
              <div className="ingest-byUrl-container">
                <input
                  placeholder="https://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd"
                  id="segmentUrl"
                  type="text"
                  ref={this.refByURLInput}
                  onKeyDown={this.onGetByURLValue}
                />
                <button
                  className="ingest-byUrl-submit"
                  onClick={this.onGetByURLValue}
                  disabled={this.state.isLoading}
                >
                  OK
                </button>
              </div>
            </div>
            {this.state.isLoading ? <span>Loading...</span> : null}
            {this.state.error ? (
              <span className="error">{this.state.error}</span>
            ) : null}
          </div>
          {this.state.manifest !== null ? (
            <Displayer manifest={this.state.manifest} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default DigestManifest;
