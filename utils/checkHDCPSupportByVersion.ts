import { IResultSupportedConfiguration } from "./emeConfiguration";

const HDCP_VERSIONS = [
  "1.0",
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "2.0",
  "2.1",
  "2.2",
  "2.3",
];

export type IMediaKeyStatus =
  | "usable"
  | "expired"
  | "released"
  | "output-restricted"
  | "output-downscaled"
  | "status-pending"
  | "internal-error"
  | "unknown";

interface IVersionStatusHDCP {
  versionStatus: IMediaKeyStatus;
  version: string;
}

export interface ISupportedStatusByKeySystemHDCP {
  statuses: IVersionStatusHDCP[];
  keySystem: string;
}

export async function checkHDCPSupportByVersion(
  supportedConfigs: IResultSupportedConfiguration[]
) {
  const supportedConfig: ISupportedStatusByKeySystemHDCP[] = [];
  for (let i = 0; i < supportedConfigs.length; i++) {
    const supportedStatus: IVersionStatusHDCP[] = [];
    const config = supportedConfigs[i];
    const mediaKeys = await config.mediaKeySystemAccess.createMediaKeys();
    if (!("getStatusForPolicy" in mediaKeys)) {
      throw "HDCP Policy Check API is not available.";
    }
    for (let j = 0; j < HDCP_VERSIONS.length; j++) {
      const version = HDCP_VERSIONS[j];
      try {
        const status = await (mediaKeys as {
          getStatusForPolicy: (policy: {
            minHdcpVersion: string;
          }) => Promise<IMediaKeyStatus>;
        }).getStatusForPolicy({ minHdcpVersion: version });
        supportedStatus.push({ version, versionStatus: status });
      } catch (e) {
        supportedStatus.push({ version, versionStatus: "unknown" });
      }
    }
    supportedConfig.push({
      keySystem: config.keySystemConfig.keySystem,
      statuses: supportedStatus,
    });
  }
  return supportedConfig;
}
