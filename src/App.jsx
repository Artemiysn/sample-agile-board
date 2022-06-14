import React from "react";
import { observer } from "mobx-react-lite";

import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <div>App</div>
    </>
  );
};

export default observer(App);
