import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Page from "./Page";
import StateContext from "../StateContext";

import BotList from "./BotList";
import AddNew from "./AddNew";

function Home() {
  const appState = useContext(StateContext);
  const navigate = useNavigate();

  function addNewBotProfileHandler(e) {
    navigate("/bot/create");
  }
  return (
    <Page title="Your Feed">
      <h2 className="text-center">Bot Profiles</h2>
      <BotList />
      <AddNew
        tooltipId={"add"}
        toolTipContent={"Add New Bot"}
        handler={addNewBotProfileHandler}
      />
    </Page>
  );
}

export default Home;
