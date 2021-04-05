import { useState } from "react";

import { Info } from "../Widgets/Info";
import { applyDate } from "../../utils/applyDate";

export const ChangeType = () => {
  const [codec, setCodec] = useState("");
  const [supportStatus, setSupport] = useState<
    boolean | "not-supported" | null
  >(null);
  const [timingOpe, setTimingOperation] = useState<string | null>(null);

  const onCodecChange = (evt: any) => {
    if (supportStatus !== null) {
      setSupport(null);
    }
    if (timingOpe !== null) {
      setTimingOperation(null);
    }
    setCodec(evt.target.value);
  };

  const onSubmit = () => {
    setTimingOperation(applyDate());
    if ("MediaSource" in window) {
      const isSupported = MediaSource.isTypeSupported(codec);
      setSupport(isSupported);
    } else {
      setSupport("not-supported");
    }
  };

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h1>MediaSource Type support</h1>
        <Info url="https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/isTypeSupported" />
      </div>
      <div>
        <div className="capabilities-input" style={{ width: "50%" }}>
          <label>codec:</label>
          <input
            type="text"
            className="onWhite"
            onChange={onCodecChange}
            value={codec}
          />
        </div>
        <div className="result-container noMargin">
          <div className="result-actions">
            <button onClick={onSubmit}>Check</button>
          </div>
          {supportStatus !== null ? (
            <div className="result-feedback">
              <span
                className={`${
                  supportStatus === "not-supported" || supportStatus === false
                    ? "result-decode--false"
                    : "result-decode--true"
                }`}
              >
                {supportStatus === "not-supported"
                  ? "Media Source (MSE) API is not available in your browser!"
                  : supportStatus === true
                  ? `'${codec}' is supported!`
                  : `'${codec}' is NOT supported`}
              </span>
            </div>
          ) : null}
          {timingOpe !== null ? (
            <div className="result-onLastOperationTiming">
              Last operation done at: {timingOpe}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
