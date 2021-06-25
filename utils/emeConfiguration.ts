type MediaKeysRequirement = "optional" | "required" | "not-allowed";

export type SessionType = "temporary" | "persistent-license";

export interface IMediaKeySystemMediaCapability {
  contentType: string;
  robustness: string | undefined;
}

export interface IMediaKeySystemConfiguration {
  label: string;
  initDataTypes: string[];
  audioCapabilities: IMediaKeySystemMediaCapability[];
  videoCapabilities: IMediaKeySystemMediaCapability[];
  distinctiveIdentifier: MediaKeysRequirement;
  persistentState: MediaKeysRequirement;
  sessionTypes: SessionType[];
}

export const DEFAULT_INIT_DATA_TYPES = ["cenc"];

export const DEFAULT_AUDIO_CAPA = [
  {
    robustness: "HW_SECURE_ALL",
    contentType: 'audio/mp4;codecs="mp4a.40.2"',
  },
  {
    robustness: "HW_SECURE_DECODE",
    contentType: 'audio/mp4;codecs="mp4a.40.2"',
  },
  {
    robustness: "HW_SECURE_CRYPTO",
    contentType: 'audio/mp4;codecs="mp4a.40.2"',
  },
  {
    robustness: "SW_SECURE_DECODE",
    contentType: 'audio/mp4;codecs="mp4a.40.2"',
  },
  {
    robustness: "SW_SECURE_CRYPTO",
    contentType: 'audio/mp4;codecs="mp4a.40.2"',
  },
];

export const DEFAULT_VIDEO_CAPA = [
  {
    robustness: "HW_SECURE_ALL",
    contentType: 'video/mp4;codecs="avc1.4d401e"',
  },
  {
    robustness: "HW_SECURE_DECODE",
    contentType: 'video/mp4;codecs="avc1.4d401e"',
  },
  {
    robustness: "HW_SECURE_CRYPTO",
    contentType: 'video/mp4;codecs="avc1.4d401e"',
  },
  {
    robustness: "SW_SECURE_DECODE",
    contentType: 'video/mp4;codecs="avc1.4d401e"',
  },
  {
    robustness: "SW_SECURE_CRYPTO",
    contentType: 'video/mp4;codecs="avc1.4d401e"',
  },
];

const keySystems = [
  "com.microsoft.playready.recommendation",
  "com.microsoft.playready.hardware",
  "com.microsoft.playready.software",
  "com.microsoft.playready",
  "com.youtube.playready",
  "com.chromecast.playready",
  "com.apple.fps.1_0",
  "com.widevine.alpha",
  "com.nagra.prm",
];

const WIDEVINE_ROBUSTNESSES = [
  "HW_SECURE_ALL",
  "HW_SECURE_DECODE",
  "HW_SECURE_CRYPTO",
  "SW_SECURE_DECODE",
  "SW_SECURE_CRYPTO",
];

export interface IEMEConfiguration {
  keySystem: string;
  keySystemConfig: IMediaKeySystemConfiguration[];
}

export interface IResultSupportedConfiguration {
  keySystemConfig: IEMEConfiguration;
  mediaKeySystemAccess: MediaKeySystemAccess;
}

export interface IResultEMEConfiguration {
  supportedConfigurations: IResultSupportedConfiguration[];
  unSupportedConfigurations: IEMEConfiguration[];
}

export const DEFAULT_KEYSYSTEM_CONFIGURATION = (
  keySystem: string
): IMediaKeySystemConfiguration => {
  const ROBUSTNESSES =
    keySystem === "com.widevine.alpha" ? WIDEVINE_ROBUSTNESSES : [undefined];
  return {
    label: "",
    initDataTypes: ["cenc"],
    audioCapabilities: (ROBUSTNESSES as any).map(
      (robustness: string | undefined) => ({
        contentType: 'audio/mp4;codecs="mp4a.40.2"',
        robustness,
      })
    ),
    videoCapabilities: (ROBUSTNESSES as any).map(
      (robustness: string | undefined) => ({
        contentType: 'video/mp4;codecs="avc1.4d401e"',
        robustness,
      })
    ),
    distinctiveIdentifier: "optional",
    persistentState: "optional",
    sessionTypes: ["temporary"],
  };
};

export function createEMEConfiguration(): IEMEConfiguration[] {
  return keySystems.map<IEMEConfiguration>((keySystem) => ({
    keySystem,
    keySystemConfig: [
      {
        ...DEFAULT_KEYSYSTEM_CONFIGURATION(keySystem),
        label: keySystem,
      },
    ],
  }));
}

export async function exposeSupportedEMEConfiguration(
  keySystemsConfigs: IEMEConfiguration[]
): Promise<IResultEMEConfiguration> {
  const unSupportedConfigurations: IEMEConfiguration[] = [];
  const analyzeSupportedConfigurations = keySystemsConfigs.map(
    async (keySystemConfig) => {
      try {
        const mediaKeySystemAccess = await navigator.requestMediaKeySystemAccess(
          keySystemConfig.keySystem,
          keySystemConfig.keySystemConfig
        );
        return { keySystemConfig, mediaKeySystemAccess };
      } catch (err) {
        unSupportedConfigurations.push(keySystemConfig);
      }
    }
  );

  const supportedConfigurations = await Promise.all(
    analyzeSupportedConfigurations
  );
  return {
    supportedConfigurations: supportedConfigurations.filter(
      (s) => !!s
    ) as IResultSupportedConfiguration[],
    unSupportedConfigurations,
  };
}
