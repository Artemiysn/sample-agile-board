import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Header from "./components/Header/Header";
import Dashboard from "./components/DashboardGroup/Dashboard/Dashboard";
import useStore from "./hooks/useStore";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage";
import LoadingPage from "./components/Pages/LoadingPage/LoadingPage";

const App = () => {

  const { status, error } = useStore();
  
  const checkPending =
    (status.users === "pending" ||
      status.boards === "pending" ||
      status.tasks === "pending") &&
    error === false;

  const checkDisplay =
    status.users === "done" &&
    status.boards === "done" &&
    status.tasks === "done" &&
    error === false;

  return (
    <>
      <Header />
      {error === true && <ErrorPage />}
      {checkPending && <LoadingPage />}
      {checkDisplay && (
        <main>
          <Dashboard />
        </main>
      )}
    </>
  );
};

export default observer(App);
