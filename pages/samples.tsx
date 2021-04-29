import { Fragment } from "react";

import { SamplesTableHLS } from "../components/Samples/SamplesTableHLS";
import { SamplesTableMPD } from "../components/Samples/SampleTableMPD";
import { SamplesTableOthers } from "../components/Samples/SampleTableOthers";
import { SamplesTableISM } from "../components/Samples/SamplesTableISM";

const Samples = () => {
  return (
    <Fragment>
      <SamplesTableHLS />
      <SamplesTableMPD />
      <SamplesTableISM />
      <SamplesTableOthers />
    </Fragment>
  );
};

export default Samples;
