import React, { Fragment } from "react";

import { Overview } from "../components/Infos/Overview";
import { Contribute } from "../components/Infos/Contribute";
import { Ressources } from "../components/Infos/Ressources";

const IndexPage = () => (
  <Fragment>
    <Overview />

    <Contribute />
    <Ressources />
  </Fragment>
);

export default IndexPage;
