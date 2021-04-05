import React, { Fragment } from "react";

import { Overview } from "../components/Infos/Overview";
import { Contribute } from "../components/Infos/Contribute";

const IndexPage = () => (
  <Fragment>
    <Overview />

    <Contribute />
  </Fragment>
);

export default IndexPage;
