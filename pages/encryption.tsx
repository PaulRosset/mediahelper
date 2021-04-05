import { Fragment } from "react";

import { EMESimpleDetection } from "../components/Encryption/EMESimpleDetection";
import { EMEAdvancedDetection } from "../components/Encryption/EMEAdvancedDetection";

const Encryption = () => {
  return (
    <Fragment>
      <EMESimpleDetection />
      <EMEAdvancedDetection />
    </Fragment>
  );
};

export default Encryption;
