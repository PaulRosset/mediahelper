import { ChangeEvent, useRef, useState } from "react";
import inspectISOBMFF from "isobmff-inspector";

import { Info } from "../Widgets/Info";
import { Title } from "../Widgets/Title";
import { Displayer } from "./Displayer";

export interface IBoxValue {
  name: string;
  value: unknown;
}

export interface IBox {
  alias: string;
  description: string;
  name: string;
  size: number;
  values?: IBoxValue[];
  children: IBox[];
}

function returnFileSize(nb: number) {
  if (nb < 1024) {
    return nb + " octets";
  } else if (nb >= 1024 && nb < 1048576) {
    return (nb / 1024).toFixed(1) + " Ko";
  }
  return (nb / 1e6).toFixed(1) + " Mo";
}

export const Parser = () => {
  const refByURLInput = useRef<HTMLInputElement>(null);
  const [boxes, setBoxes] = useState<IBox[] | null>(null);
  const [segmentSize, setSegSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoader] = useState(false);

  const onUploadFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files === null || files.length === 0) {
      return;
    }
    setLoader(true);
    const file = files[0];
    const reader = new FileReader();
    setSegSize(returnFileSize(file.size));
    reader.onload = (evt) => {
      const arr = new Uint8Array(evt.target?.result as ArrayBuffer);
      const res = inspectISOBMFF(arr);
      setLoader(false);
      setBoxes(res);
    };
    reader.readAsArrayBuffer(file);
  };

  const onGetByURLValue = (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return;
    }
    console.warn("polo");
    const url = refByURLInput.current?.value ?? "";
    if (url === "") {
      return;
    }
    setLoader(true);
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        setError(null);
        setSegSize(returnFileSize(data.byteLength));
        const parsedData = inspectISOBMFF(new Uint8Array(data));
        setLoader(false);
        setBoxes(parsedData);
      })
      .catch((err) => {
        setError(err.message);
        setSegSize(null);
        setBoxes(null);
        setLoader(false);
      });
  };

  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="ISOBMFF Inspector" anchor="isobmffInspector" />
        <Info url="https://github.com/peaBerberian/isobmff-inspector" />
      </div>
      <div>
        <div className="ingest-container">
          <div className="ingest-input-container">
            <label htmlFor="file-upload">Pick a local file:</label>
            <input
              id="file-upload"
              type="file"
              onChange={onUploadFile}
              disabled={isLoading}
            />
          </div>
          <span>OR</span>
          <div className="ingest-input-container">
            <label htmlFor="segmentUrl">By URL:</label>
            <div className="ingest-byUrl-container">
              <input
                placeholder="https://www.bok.net/dash/tears_of_steel/cleartext/video/6/seg-7.m4f"
                id="segmentUrl"
                type="text"
                ref={refByURLInput}
                onKeyDown={onGetByURLValue}
              />
              <button
                className="ingest-byUrl-submit"
                onClick={onGetByURLValue}
                disabled={isLoading}
              >
                OK
              </button>
            </div>
          </div>
          {isLoading ? <span>Loading...</span> : null}
          {error !== null ? <span>{error}</span> : null}
        </div>
        {boxes !== null ? (
          <Displayer boxes={boxes} segmentSize={segmentSize ?? "Unknown"} />
        ) : null}
      </div>
    </div>
  );
};
