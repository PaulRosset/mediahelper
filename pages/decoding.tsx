import { Fragment } from "react";

import { ChangeType } from "../components/Decoding/ChangeType";
import { MediaCapabitities } from "../components/Decoding/MediaCapabilities";

const Decoding = () => {
  return (
    <Fragment>
      <ChangeType />
      <MediaCapabitities />
    </Fragment>
  );
};

export default Decoding;
