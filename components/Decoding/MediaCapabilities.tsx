import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { applyDate } from "../../utils/applyDate";

import { ResultCapabilities } from "./ResultCapabilities";
import { Capabitities } from "./VideoCapabilities";

import { Info } from "../Widgets/Info";
import { Title } from "../Widgets/Title";

interface IFormFields {
  videoContentType: string;
  channels: string;
  videoBitrate: string;
  samplerate: string;
  audioContentType: string;
  width: string;
  height: string;
  audioBitrate: string;
  framerate: string;
}

export interface IDecodingResult {
  supported: boolean;
  smooth: boolean;
  powerEfficient: boolean;
}

type MediaType = "file" | "media-source";

export const MediaCapabitities = () => {
  const [type, setType] = useState<MediaType>("media-source");
  const [isVideoBufferChecked, toggleVideoBuffer] = useState(false);
  const [isAudioBufferChecked, toggleAudioBuffer] = useState(false);
  const [result, setResult] = useState<IDecodingResult | null>(null);
  const [timingOpe, setTimingOperation] = useState<string | null>(null);
  const [errorOnDecodingInfos, setErrorOnDecodingInfos] = useState<
    string | null
  >(null);

  const { register, handleSubmit } = useForm<IFormFields>();

  const onSubmit = (data: IFormFields) => {
    setTimingOperation(applyDate());
    const mediaConfig = {
      type,
      ...(isAudioBufferChecked && {
        audio: {
          contentType: data.audioContentType,
          channels: data.channels,
          bitrate: parseFloat(data.audioBitrate),
          samplerate: parseFloat(data.samplerate),
        },
      }),
      ...(isVideoBufferChecked && {
        video: {
          contentType: data.videoContentType,
          width: parseInt(data.width),
          height: parseInt(data.height),
          bitrate: parseFloat(data.audioBitrate),
          framerate: data.framerate,
        },
      }),
    };
    (navigator as any).mediaCapabilities
      .decodingInfo(mediaConfig)
      .then((resultDecoding: IDecodingResult) => {
        if (errorOnDecodingInfos !== null) {
          setErrorOnDecodingInfos(null);
        }
        const { supported, smooth, powerEfficient } = resultDecoding;
        setResult({
          supported,
          smooth,
          powerEfficient,
        });
      })
      .catch((err: Error) => {
        setResult(null);
        setErrorOnDecodingInfos(err.message);
      });
  };

  const onSetType = (type: MediaType) => () => {
    setType(type);
  };

  const onToggleVideoBuffer = () => {
    toggleVideoBuffer((prevState) => !prevState);
  };

  const onToggleAudioBuffer = () => {
    toggleAudioBuffer((prevState) => !prevState);
  };

  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="Media Capabitities API" anchor="mediaCapaAPI" />
        <Info url="https://googlechrome.github.io/samples/media-capabilities/decoding-info.html" />
      </div>
      <div>
        <h4>Media Configuration:</h4>
        <div className="flex primaryConfigAdvDecoding">
          <div className="mediaCapa-inputs">
            <span>
              <strong>Type:</strong>
            </span>
            <div>
              <input
                id="file"
                type="radio"
                checked={type === "file"}
                onChange={onSetType("file")}
              />
              <label htmlFor="file">file</label>
            </div>
            <div>
              <input
                id="mediaSource"
                type="radio"
                checked={type === "media-source"}
                onChange={onSetType("media-source")}
              />
              <label htmlFor="mediaSource">media-source</label>
            </div>
          </div>
          <div className="mediaCapa-inputs">
            <span>
              <strong>BufferType:</strong>
            </span>
            <div>
              <input
                id="video"
                type="checkbox"
                checked={isVideoBufferChecked}
                onChange={onToggleVideoBuffer}
              />
              <label htmlFor="video">video</label>
            </div>
            <div>
              <input
                id="audio"
                type="checkbox"
                checked={isAudioBufferChecked}
                onChange={onToggleAudioBuffer}
              />
              <label htmlFor="audio">audio</label>
            </div>
          </div>
        </div>
      </div>
      {isVideoBufferChecked || isAudioBufferChecked ? (
        <div className="capabilities-container">
          {isVideoBufferChecked ? (
            <Capabitities title="Video">
              <div className="capabilities-input">
                <label>contentType</label>
                <input
                  type="text"
                  ref={register}
                  name="videoContentType"
                  placeholder='video/mp4;codecs="avc1.4d401e"'
                />
              </div>
              <div className="capabilties-grouped">
                <div className="capabilities-input">
                  <label>width</label>
                  <input
                    type="text"
                    ref={register}
                    name="width"
                    placeholder="1920"
                  />
                </div>
                <div className="capabilities-input">
                  <label>height</label>
                  <input
                    type="text"
                    ref={register}
                    name="height"
                    placeholder="1080"
                  />
                </div>
              </div>
              <div className="capabilties-grouped">
                <div className="capabilities-input">
                  <label>bitrate</label>
                  <input
                    type="text"
                    ref={register}
                    name="videoBitrate"
                    placeholder="4500000"
                  />
                </div>
                <div className="capabilities-input">
                  <label>framerate</label>
                  <input
                    type="text"
                    ref={register}
                    name="framerate"
                    placeholder="50"
                  />
                </div>
              </div>
            </Capabitities>
          ) : null}
          {isAudioBufferChecked ? (
            <Capabitities title="Audio">
              <div className="capabilities-input">
                <label>contentType</label>
                <input
                  type="text"
                  ref={register}
                  name="audioContentType"
                  placeholder='audio/mp4;codecs="mp4a.40.2"'
                />
              </div>
              <div className="capabilities-input">
                <label>channels</label>
                <input
                  type="text"
                  ref={register}
                  name="channels"
                  placeholder="2"
                />
              </div>
              <div className="capabilties-grouped">
                <div className="capabilities-input">
                  <label>bitrate</label>
                  <input
                    type="text"
                    ref={register}
                    name="audioBitrate"
                    placeholder="192000"
                  />
                </div>
                <div className="capabilities-input">
                  <label>samplerate</label>
                  <input
                    type="text"
                    ref={register}
                    name="samplerate"
                    placeholder="48000"
                  />
                </div>
              </div>
            </Capabitities>
          ) : null}
        </div>
      ) : null}
      {isVideoBufferChecked || isAudioBufferChecked ? (
        <ResultCapabilities
          error={errorOnDecodingInfos}
          result={result}
          lastTimingOpe={timingOpe}
          onClick={handleSubmit(onSubmit)}
        />
      ) : null}
    </div>
  );
};
