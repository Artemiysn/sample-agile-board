import React from "react";
import { observer } from "mobx-react-lite";
import Header from "./components/Header/Header";
import Dashboard from "./components/DashboardGroup/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default observer(App);
