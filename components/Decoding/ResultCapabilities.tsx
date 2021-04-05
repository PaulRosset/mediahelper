import { IDecodingResult } from "./MediaCapabilities";

interface IProps {
  error: string | null;
  result: IDecodingResult | null;
  lastTimingOpe: string | null;
  onClick: () => void;
}

export const ResultCapabilities = ({
  error,
  result,
  onClick,
  lastTimingOpe,
}: IProps) => {
  return (
    <div className="result-container">
      <div className="result-actions">
        <button onClick={onClick}>Check</button>
      </div>
      {error !== null && <div className="result-Decodingerror">{error}</div>}
      {result !== null && (
        <div className="result-feedback">
          <span>
            Is media <strong>Supported</strong>:{" "}
            <span
              className={`result-decode--${
                result.supported ? "true" : "false"
              }`}
            >
              {String(result.supported)}
            </span>
          </span>
          <br />
          <span>
            Is media playback <strong>Smooth</strong>:{" "}
            <span
              className={`result-decode--${result.smooth ? "true" : "false"}`}
            >
              {String(result.smooth)}
            </span>
          </span>
          <br />
          <span>
            Is the media playback <strong>Power Efficient</strong>:{" "}
            <span
              className={`result-decode--${
                result.powerEfficient ? "true" : "false"
              }`}
            >
              {String(result.powerEfficient)}
            </span>
          </span>
        </div>
      )}
      {lastTimingOpe !== null ? (
        <div className="result-onLastOperationTiming">
          Last operation done at: {lastTimingOpe}
        </div>
      ) : null}
    </div>
  );
};
