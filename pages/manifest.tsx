import dynamic from "next/dynamic";
import { Fragment } from "react";

import DigestDurationISO8601 from "../components/ManifestTools/DurationISO/DigestDurationISO8601";

const DigestManifest = dynamic(
  () => import("../components/ManifestTools/Manifest/DigestManifest"),
  { ssr: false }
);

const Isobmff = () => {
  return (
    <Fragment>
      <DigestDurationISO8601 />
      <DigestManifest />
    </Fragment>
  );
};

export default Isobmff;
