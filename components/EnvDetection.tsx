import { useEffect, useState } from "react";
import Bowser from "bowser";

import { Copy } from "./Widgets/Copy";

interface IBowserInfos {
  platform: string;
  os: string;
  browserName: string;
  browserVersion: string;
}

export const EnvDetection = () => {
  const [infosEnv, setInfosEnv] = useState<IBowserInfos | null>(null);

  useEffect(() => {
    const bowserParser = Bowser.getParser(window.navigator.userAgent);
    setInfosEnv({
      platform: bowserParser.getPlatformType(),
      os: bowserParser.getOSName(),
      browserName: bowserParser.getBrowserName(),
      browserVersion: bowserParser.getBrowserVersion(),
    });
  }, []);

  return (
    <div className="widget-persist-container">
      <div className="widget-options-copy">
        <Copy text={JSON.stringify(infosEnv)} />
      </div>
      <p className="widget-env">
        <span>
          <strong>Platform: </strong>
          {infosEnv?.platform ?? "Unknown"}
        </span>
        <span>
          <strong>OS: </strong>
          {infosEnv?.os ?? "Unknown"}
        </span>
        <span>
          <strong>Browser: </strong>
          {infosEnv?.browserName ?? "Unknown"}
        </span>
        <span>
          <strong>Browser version: </strong>
          {infosEnv?.browserVersion ?? "Unknown"}
        </span>
      </p>
    </div>
  );
};
