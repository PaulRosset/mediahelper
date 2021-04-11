import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { IMediaKeySystemConfiguration } from "../../utils/emeConfiguration";
import { getCDMNameFromKeySystem } from "../../utils/getCDMNameFromKeySytem";
import { getWidevineSecurityLevel } from "../../utils/getWidevineSecurityLevel";

interface IProps {
  EMEConfig: IMediaKeySystemConfiguration;
  setEMEConfig: (data: IMediaKeySystemConfiguration) => void;
}

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const KEY_SHOULD_COLLAPSE = ["audioCapabilities", "videoCapabilities"];

const KEY_SHOULD_NOT_REMOVE = [
  "keySystem",
  "keySystemConfig",
  "label",
  "initDataTypes",
  "audioCapabilities",
  "videoCapabilities",
  "distinctiveIdentifier",
  "persistentState",
  "sessionTypes",
  "null",
];

export const EMEConfiguration = ({ EMEConfig, setEMEConfig }: IProps) => {
  const [result, setResult] = useState<MediaKeySystemAccess | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shouldShowPreciseConfig, showPreciseConfig] = useState(false);

  const toggleShowingPreciseConfig = () => {
    showPreciseConfig((prevState) => !prevState);
  };

  useEffect(() => {
    setResult(null);
  }, [EMEConfig]);

  const checkConfiguration = () => {
    navigator
      .requestMediaKeySystemAccess(EMEConfig.label, [EMEConfig])
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        setResult(null);
        setError(err?.message ?? "An unknown error happened.");
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div className="codeDisplayPosition">
      <div className="codeContainer">
        <ReactJson
          src={EMEConfig}
          theme="summerfruit"
          name={null}
          displayDataTypes={false}
          displayObjectSize={false}
          quotesOnKeys={false}
          shouldCollapse={(field) =>
            KEY_SHOULD_COLLAPSE.includes(field.name ?? "")
          }
          onDelete={(evt) => {
            if (KEY_SHOULD_NOT_REMOVE.includes(evt.name ?? "")) {
              return false;
            }
            setEMEConfig(evt.updated_src as IMediaKeySystemConfiguration);
            return true;
          }}
        />
      </div>
      <button className="submitEMEConfiguration" onClick={checkConfiguration}>
        Submit
      </button>
      {result !== null ? (
        <div className="resultEMEAdvanced">
          <span>
            Supported keySystem (
            <input
              id="showConfig"
              type="checkbox"
              onChange={toggleShowingPreciseConfig}
              checked={shouldShowPreciseConfig}
            />{" "}
            <label htmlFor="showConfig">Show config</label>
            ):
          </span>
          <span
            className={`keySystem keySystem--${getCDMNameFromKeySystem(
              result.keySystem
            )}`}
          >
            {`${result.keySystem} ${
              result.keySystem.includes("widevine")
                ? `(${getWidevineSecurityLevel(
                    result
                      .getConfiguration()
                      .videoCapabilities?.map(
                        (capa) => capa.robustness ?? ""
                      ) ?? []
                  )})`
                : ""
            }`}
          </span>
          {shouldShowPreciseConfig ? (
            <div className="codeContainer">
              <ReactJson
                src={result.getConfiguration()}
                theme="summerfruit"
                name={null}
                displayDataTypes={false}
                displayObjectSize={false}
                shouldCollapse={(field) =>
                  KEY_SHOULD_COLLAPSE.includes(field.name ?? "")
                }
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {error !== null ? (
        <span className="errorAdvancedEME">{error}</span>
      ) : null}
    </div>
  );
};
