import { useState } from "react";

import { Info } from "../Widgets/Info";
import { Title } from "../Widgets/Title";

import { FormEME } from "./FormEME";
import { EMEConfiguration } from "./EMEConfiguration";
import {
  DEFAULT_AUDIO_CAPA,
  DEFAULT_INIT_DATA_TYPES,
  DEFAULT_VIDEO_CAPA,
  IMediaKeySystemConfiguration,
  IMediaKeySystemMediaCapability,
  SessionType,
} from "../../utils/emeConfiguration";

export interface onChangeEMEConfiguration {
  keySystem: string;
  sessionTypes: SessionType[];
  distinctiveId: MediaKeysRequirement;
  persistentState: MediaKeysRequirement;
}

export const EMEAdvancedDetection = () => {
  const [EMEConfig, setEMEConfig] = useState<IMediaKeySystemConfiguration>({
    label: "",
    initDataTypes: DEFAULT_INIT_DATA_TYPES,
    audioCapabilities: DEFAULT_AUDIO_CAPA,
    videoCapabilities: DEFAULT_VIDEO_CAPA,
    distinctiveIdentifier: "optional",
    persistentState: "optional",
    sessionTypes: ["temporary"],
  });

  const onAddInitDataTypes = (initDataType: string) => {
    if (EMEConfig !== null) {
      setEMEConfig({
        ...EMEConfig,
        initDataTypes: [...EMEConfig.initDataTypes, initDataType],
      });
    }
  };

  const onAddAudioCapa = ({
    contentType,
    robustness,
  }: IMediaKeySystemMediaCapability) => {
    if (EMEConfig !== null) {
      setEMEConfig({
        ...EMEConfig,
        audioCapabilities: [
          ...EMEConfig.audioCapabilities,
          { contentType, robustness },
        ],
      });
    }
  };

  const onAddVideoCapa = ({
    contentType,
    robustness,
  }: IMediaKeySystemMediaCapability) => {
    if (EMEConfig !== null) {
      setEMEConfig({
        ...EMEConfig,
        videoCapabilities: [
          ...EMEConfig.videoCapabilities,
          { contentType, robustness },
        ],
      });
    }
  };

  const onChangeEMEConfig = (data: onChangeEMEConfiguration) => {
    const { keySystem, sessionTypes, distinctiveId, persistentState } = data;
    setEMEConfig({
      label: keySystem,
      initDataTypes: EMEConfig?.initDataTypes ?? [],
      audioCapabilities: EMEConfig?.audioCapabilities ?? [],
      videoCapabilities: EMEConfig?.videoCapabilities ?? [],
      distinctiveIdentifier: distinctiveId,
      persistentState,
      sessionTypes,
    });
  };

  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title
          text="Advanced KeySystems Detection"
          anchor="advancedKeySystems"
        />
        <Info url="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess" />
      </div>
      <div>
        <p>
          For advanced usage, you can create your own Media KeySystem
          configuration with a simplified interface.
        </p>

        <div className="advancedDetectionContainer">
          <FormEME
            onChangeEMEConfig={onChangeEMEConfig}
            onAddInitDataTypes={onAddInitDataTypes}
            onAddVideoCapa={onAddVideoCapa}
            onAddAudioCapa={onAddAudioCapa}
            sessionTypePersistentProp={EMEConfig.sessionTypes.includes(
              "persistent-license"
            )}
            sessionTypeTemporaryProp={EMEConfig.sessionTypes.includes(
              "temporary"
            )}
          />
          <EMEConfiguration EMEConfig={EMEConfig} setEMEConfig={setEMEConfig} />
        </div>
      </div>
    </div>
  );
};
