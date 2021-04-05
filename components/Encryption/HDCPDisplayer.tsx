import { ISupportedStatusByKeySystemHDCP } from "../../utils/checkHDCPSupportByVersion";
import { getCDMNameFromKeySystem } from "../../utils/getCDMNameFromKeySytem";

interface IProps {
  supportedHDCPVersions: ISupportedStatusByKeySystemHDCP[] | null;
}

export const HDCPDisplayer = ({ supportedHDCPVersions }: IProps) => {
  return supportedHDCPVersions !== null ? (
    <div>
      {supportedHDCPVersions.map((hdcpVersionByKeysystem) => (
        <div
          key={hdcpVersionByKeysystem.keySystem}
          className="hdcpResultContainerPerKeySystem"
        >
          <span
            className={`keySystem keySystem--${getCDMNameFromKeySystem(
              hdcpVersionByKeysystem.keySystem
            )}`}
          >
            {hdcpVersionByKeysystem.keySystem}
          </span>
          <div>
            {hdcpVersionByKeysystem.statuses.map((status) => (
              <div className="hdcpResult">
                {status.version} -- {status.versionStatus}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;
};
