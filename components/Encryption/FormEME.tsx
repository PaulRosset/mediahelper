import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IMediaKeySystemMediaCapability,
  SessionType,
} from "../../utils/emeConfiguration";

import { onChangeEMEConfiguration } from "./EMEAdvancedDetection";

interface IProps {
  onChangeEMEConfig: (EMEConfig: onChangeEMEConfiguration) => void;
  onAddInitDataTypes: (initDataType: string) => void;
  onAddVideoCapa: (data: IMediaKeySystemMediaCapability) => void;
  onAddAudioCapa: (data: IMediaKeySystemMediaCapability) => void;
  sessionTypeTemporaryProp: boolean;
  sessionTypePersistentProp: boolean;
}

export interface IFormFields {
  keySystem: string;
  initDataTypes: string;
  audioContentType: string;
  audioRobustness: string;
  videoContentType: string;
  videoRobustness: string;
  sessionTypeTemporary: boolean;
  sessionTypePersistent: boolean;
}

export const FormEME = ({
  onChangeEMEConfig,
  onAddInitDataTypes: addInitDataTypes,
  onAddAudioCapa,
  onAddVideoCapa,
  sessionTypeTemporaryProp,
  sessionTypePersistentProp,
}: IProps) => {
  const { register, watch, getValues, setValue } = useForm<IFormFields>({
    defaultValues: {
      sessionTypeTemporary: true,
    },
  });
  const [distinctiveId, setDistinctiveId] = useState<MediaKeysRequirement>(
    "optional"
  );
  const [persistentState, setPersistentState] = useState<MediaKeysRequirement>(
    "optional"
  );

  useEffect(() => {
    const {
      keySystem,
      sessionTypePersistent,
      sessionTypeTemporary,
    } = getValues();
    const sessionTypes: SessionType[] = [];
    if (sessionTypeTemporary) sessionTypes.push("temporary");
    if (sessionTypePersistent) sessionTypes.push("persistent-license");
    onChangeEMEConfig({
      keySystem,
      distinctiveId,
      persistentState,
      sessionTypes,
    });
  }, [
    distinctiveId,
    persistentState,
    watch("keySystem"),
    watch("sessionTypeTemporary"),
    watch("sessionTypePersistent"),
  ]);

  useEffect(() => {
    setValue("sessionTypePersistent", !!sessionTypePersistentProp);
    setValue("sessionTypeTemporary", !!sessionTypeTemporaryProp);
  }, [sessionTypeTemporaryProp, sessionTypePersistentProp]);

  const onAddInitDataTypes = () => {
    const { initDataTypes } = getValues();
    addInitDataTypes(initDataTypes);
  };

  const onAddAudioCapabilities = () => {
    const { videoContentType, videoRobustness } = getValues();
    onAddAudioCapa({
      contentType: videoContentType,
      robustness: videoRobustness,
    });
  };

  const onAddVideoCapabilities = () => {
    const { audioContentType, audioRobustness } = getValues();
    onAddVideoCapa({
      contentType: audioContentType,
      robustness: audioRobustness,
    });
  };

  const onChangeDistinctiveId = (evt: React.ChangeEvent) => {
    setDistinctiveId(evt.target.id as MediaKeysRequirement);
  };

  const onChangePersistentState = (evt: React.ChangeEvent) => {
    const id = evt.target.id.replace("state-", "");
    setPersistentState(id as MediaKeysRequirement);
  };

  return (
    <div className="formEME">
      <div>
        <label className="labelTitle">keySystem:</label>
        <div className="formSelfText">
          <input
            type="text"
            name="keySystem"
            ref={register}
            placeholder="com.widevine.alpha"
          />
        </div>
      </div>
      <div>
        <label className="labelTitle">initDataTypes:</label>
        <div className="formSelfText">
          <input
            type="text"
            name="initDataTypes"
            ref={register}
            placeholder="cenc,keyids..."
          />
        </div>
        <button className="capabilitiesPush" onClick={onAddInitDataTypes}>
          +
        </button>
      </div>
      <div>
        <label className="labelTitle">audioCapabilities:</label>
        <div className="emeContainerForm">
          <div className="formSelfText">
            <label>contentType</label>
            <input
              type="text"
              name="audioContentType"
              ref={register}
              placeholder='audio/mp4;codecs="mp4a.40.2"'
            />
          </div>
          <div className="formSelfText">
            <label>robustness</label>
            <input
              type="text"
              name="audioRobustness"
              ref={register}
              placeholder="HW_SECURE_ALL, HW_SECURE_DECODE, HW_SECURE_CRYPTO, SW_SECURE_DECODE, SW_SECURE_CRYPTO"
            />
          </div>
          <button className="capabilitiesPush" onClick={onAddAudioCapabilities}>
            +
          </button>
        </div>
      </div>
      <div>
        <label className="labelTitle">videoCapabilities:</label>
        <div className="emeContainerForm">
          <div className="formSelfText">
            <label>contentType</label>
            <input
              type="text"
              name="videoContentType"
              ref={register}
              placeholder='video/mp4;codecs="avc1.4d401e"'
            />
          </div>
          <div className="formSelfText">
            <label>robustness</label>
            <input
              type="text"
              name="videoRobustness"
              ref={register}
              placeholder="HW_SECURE_ALL, HW_SECURE_DECODE, HW_SECURE_CRYPTO, SW_SECURE_DECODE, SW_SECURE_CRYPTO"
            />
          </div>
          <button className="capabilitiesPush" onClick={onAddVideoCapabilities}>
            +
          </button>
        </div>
      </div>
      <div>
        <label className="labelTitle">distinctiveIdentifier:</label>
        <div className="emeContainerForm">
          <div className="formSelfBox">
            <input
              type="radio"
              id="optional"
              name="optional"
              onChange={onChangeDistinctiveId}
              checked={distinctiveId === "optional"}
            />
            <label htmlFor="optional">optional</label>
          </div>
          <div className="formSelfBox">
            <input
              type="radio"
              id="required"
              name="required"
              onChange={onChangeDistinctiveId}
              checked={distinctiveId === "required"}
            />
            <label htmlFor="required">required</label>
          </div>
          <div className="formSelfBox">
            <input
              type="radio"
              id="not-allowed"
              name="not-allowed"
              onChange={onChangeDistinctiveId}
              checked={distinctiveId === "not-allowed"}
            />
            <label htmlFor="not-allowed">not-allowed</label>
          </div>
        </div>
      </div>
      <div>
        <label className="labelTitle">persistentState:</label>
        <div className="emeContainerForm">
          <div className="formSelfBox">
            <input
              type="radio"
              id="state-optional"
              name="state-optional"
              onChange={onChangePersistentState}
              checked={persistentState === "optional"}
            />
            <label htmlFor="state-optional">optional</label>
          </div>
          <div className="formSelfBox">
            <input
              type="radio"
              id="state-required"
              name="state-required"
              onChange={onChangePersistentState}
              checked={persistentState === "required"}
            />
            <label htmlFor="state-required">required</label>
          </div>
          <div className="formSelfBox">
            <input
              type="radio"
              id="state-not-allowed"
              name="state-not-allowed"
              onChange={onChangePersistentState}
              checked={persistentState === "not-allowed"}
            />
            <label htmlFor="state-not-allowed">not-allowed</label>
          </div>
        </div>
      </div>
      <div className="emeContainerForm">
        <label className="labelTitle">sessionTypes:</label>
        <div className="formSelfBox">
          <input
            type="checkbox"
            id="temporary"
            name="sessionTypeTemporary"
            ref={register}
          />
          <label htmlFor="temporary">temporary</label>
        </div>
        <div className="formSelfBox">
          <input
            type="checkbox"
            id="persistent-license"
            name="sessionTypePersistent"
            ref={register}
          />
          <label htmlFor="persistent-license">persistent-license</label>
        </div>
      </div>
    </div>
  );
};
