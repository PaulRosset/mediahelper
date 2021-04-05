import React, { Fragment, useEffect, useState } from "react";
import {
  checkHDCPSupportByVersion,
  ISupportedStatusByKeySystemHDCP,
} from "../../utils/checkHDCPSupportByVersion";
import {
  createEMEConfiguration,
  DEFAULT_KEYSYSTEM_CONFIGURATION,
  exposeSupportedEMEConfiguration,
  IEMEConfiguration,
  IResultSupportedConfiguration,
} from "../../utils/emeConfiguration";
import { getCDMNameFromKeySystem } from "../../utils/getCDMNameFromKeySytem";
import { getWidevineSecurityLevel } from "../../utils/getWidevineSecurityLevel";
import { Info } from "../Widgets/Info";

import { HDCPDisplayer } from "./HDCPDisplayer";

export const EMESimpleDetection = () => {
  const [supportedConfig, setSupportedConfig] = useState<
    IResultSupportedConfiguration[] | null
  >(null);
  const [unSupportedConfig, setUnSupportedConfig] = useState<
    IEMEConfiguration[] | null
  >(null);
  const [supportedHDCPVersions, setSupportedHDCPVersions] = useState<
    ISupportedStatusByKeySystemHDCP[] | null
  >(null);
  const [shouldShowHDCP, showHDCP] = useState(false);

  const onChangeHDCPDisplay = () => {
    showHDCP((prevState) => !prevState);
  };

  useEffect(() => {
    const keySystemsConfigs = createEMEConfiguration(
      DEFAULT_KEYSYSTEM_CONFIGURATION
    );
    exposeSupportedEMEConfiguration(keySystemsConfigs)
      .then((res) => {
        setSupportedConfig(res.supportedConfigurations);
        setUnSupportedConfig(res.unSupportedConfigurations);
        checkHDCPSupportByVersion(res.supportedConfigurations)
          .then((res) => {
            setSupportedHDCPVersions(res);
          })
          .catch((err) => {
            console.warn("HDCP ERROR", err);
          });
      })
      .catch((err) => {
        console.error("EME DETECTION", err);
      });
  }, []);

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h1>Quick KeySystems Detection</h1>
        <Info url="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess" />
      </div>
      <div>
        {supportedConfig !== null && unSupportedConfig !== null ? (
          <Fragment>
            <p>
              KeySystems <strong>tested</strong> with an <strong>open</strong>{" "}
              configuration:
            </p>
            <div className="keySystemsDisplayer">
              {supportedConfig.map((config) => (
                <div
                  key={config.keySystemConfig.keySystem}
                  className={`keySystem keySystem--${getCDMNameFromKeySystem(
                    config.keySystemConfig.keySystem
                  )}`}
                >
                  {config.keySystemConfig.keySystem}
                </div>
              ))}
              {unSupportedConfig.map((config) => (
                <div
                  key={config.keySystem}
                  className={`keySystem keySystem--${getCDMNameFromKeySystem(
                    config.keySystem
                  )}`}
                >
                  {config.keySystem}
                </div>
              ))}
            </div>
          </Fragment>
        ) : null}
      </div>
      <div>
        <p>
          KeySystem(s) <strong>supported</strong>:
        </p>
        {supportedConfig !== null ? (
          <div className="keySystemsDisplayer">
            {supportedConfig.map(
              ({ keySystemConfig, mediaKeySystemAccess }) => (
                <div
                  key={keySystemConfig.keySystem}
                  className={`keySystem keySystem--${getCDMNameFromKeySystem(
                    keySystemConfig.keySystem
                  )}`}
                >
                  {`${keySystemConfig.keySystem} ${
                    keySystemConfig.keySystem.includes("widevine")
                      ? `(${getWidevineSecurityLevel(
                          mediaKeySystemAccess
                            .getConfiguration()
                            .videoCapabilities?.map(
                              (capa) => capa.robustness ?? ""
                            ) ?? []
                        )})`
                      : ""
                  }`}
                </div>
              )
            )}
          </div>
        ) : null}
      </div>
      <div onClick={onChangeHDCPDisplay} className="showHDCP">
        <input type="checkbox" name="hdcp" checked={shouldShowHDCP} readOnly />
        <label htmlFor="hdcp">
          <strong>Show HDCP version support for supported keySystems</strong>
        </label>
      </div>
      {shouldShowHDCP ? (
        <HDCPDisplayer supportedHDCPVersions={supportedHDCPVersions} />
      ) : null}
    </div>
  );
};