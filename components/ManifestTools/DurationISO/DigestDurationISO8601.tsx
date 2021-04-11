import { useState, useRef } from "react";

import { Info } from "../../Widgets/Info";
import { Title } from "../../Widgets/Title";

import { parseDurationISO8601 } from "../../../utils/parseDurationISO8601";
import { Displayer } from "./Displayer";

const DigestDurationISO8601 = () => {
  const refByURLInput = useRef<HTMLInputElement>(null);
  const [durationISO8601, setParsedDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onGetByURLValue = (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return;
    }
    setError(null);
    const duration = refByURLInput.current?.value ?? "";
    if (duration === "") {
      return;
    }
    const parsedDuration = parseDurationISO8601(duration);
    if (typeof parsedDuration === "number") {
      setParsedDuration(parsedDuration);
    } else {
      setError("Can't parse the ISO8601 duration.");
    }
  };

  const onChangeValueDuration = () => {
    if (error !== null) {
      setError(null);
    }
  };

  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="Parse ISO-8601 duration" anchor="durationISO8601" />
        <Info url="https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm" />
      </div>
      <div>
        <div className="ingest-container">
          <div className="ingest-input-container">
            <label htmlFor="segmentUrl">Duration:</label>
            <div className="ingest-byUrl-container">
              <input
                placeholder="PT29.229S"
                id="segmentUrl"
                type="text"
                ref={refByURLInput}
                onKeyDown={onGetByURLValue}
                onChange={onChangeValueDuration}
              />
              <button className="ingest-byUrl-submit" onClick={onGetByURLValue}>
                OK
              </button>
            </div>
          </div>
          {error ? <span className="error">{error}</span> : null}
        </div>
        {durationISO8601 !== null ? (
          <Displayer durationIS08601={durationISO8601} />
        ) : null}
      </div>
    </div>
  );
};

export default DigestDurationISO8601;
