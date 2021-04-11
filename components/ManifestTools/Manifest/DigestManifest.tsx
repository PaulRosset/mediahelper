import { createRef, Component, RefObject } from "react";
import RxPlayer from "rx-player";
import { getTransportFromUrl } from "../../../utils/getTransportFromUrl";

import { Info } from "../../Widgets/Info";
import { Title } from "../../Widgets/Title";
import { Displayer } from "./Displayer";

interface IProps {}

interface IState {
  error: string | null;
  manifest: { [key: string]: unknown } | null;
  isLoading: boolean;
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
    };
  }

  onGetByURLValue = (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return;
    }
    const url = this.refByURLInput.current?.value ?? "";
    if (url === "") {
      return;
    }
    this.setState({
      isLoading: true,
    });
    try {
      const transport = getTransportFromUrl(url);
      if (!["dash", "smooth"].includes(transport)) {
        this.setState({
          error: "Only dash and smooth protocol are supported atm.",
        });
      }
      const player = new RxPlayer();
      player.addEventListener("error", (err) => {
        console.warn(err.message);
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
