import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import Page from "./Page";
import useRequireAuth from "../hoc/Auth";
import axiosInstance from "../api_call";
import AddNewDropDown from "./AddNewDropDown";
import ResourceList from "./ResourceList";
import DispatchContext from "../DispatchContext";

function BotDetails() {
  useRequireAuth();
  const { id } = useParams();
  const [botDetails, setBotDetails] = useState();
  const [changeBotDetails, setChangeBotDetails] = useState(false);
  const [botResources, setBotResources] = useState([]);
  const [newResource, setNewResource] = useState(0);
  const [isIndexLoading, setIsIndexLoading] = useState(false);
  const appDispatch = useContext(DispatchContext);

  function handleIndexClick(e) {
    e.preventDefault();
    setIsIndexLoading(true);
    axiosInstance
      .post("/bot/index/", { bot_id: id })
      .then((response) => {
        console.log("index response", response.data.data);
        setChangeBotDetails(!changeBotDetails);
        setIsIndexLoading(false);
      })
      .catch((error) => {
        console.log("Error", error.response.data);
      });
  }

  useEffect(() => {
    axiosInstance
      .get(`/bot/profile/${id}/`, { appDispatch })
      .then((response) => {
        console.log("response", response.data.data);
        setBotDetails(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [changeBotDetails]);
  useEffect(() => {
    axiosInstance
      .get(`bot/resource?bot_id=${id}`, { appDispatch })
      .then((response) => {
        console.log("response", response.data.data);
        setBotResources(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [newResource]);
  return (
    <Page title="Bot Details">
      <div className="d-flex justify-content-between">
        {botDetails && (
          <>
            <h2 className="bottom-margin">{botDetails.bot_name}</h2>
            <span className="pt-2">
              <AddNewDropDown
                newresource={newResource}
                setnewresource={setNewResource}
              />
            </span>
          </>
        )}
        {!botDetails && <Spinner animation="grow" variant="info" />}
      </div>
      {botResources && (
        <>
          <ResourceList
            resources={botResources}
            newresource={newResource}
            setnewresource={setNewResource}
          />
          <div className="d-flex justify-content-between top-margin">
            {console.log(
              "bot resources...",
              botResources,
              JSON.stringify(botResources) === JSON.stringify([])
            )}
            <Button
              onClick={handleIndexClick}
              disabled={
                JSON.stringify(botResources) === JSON.stringify([])
                  ? true
                  : false
              }
            >
              {isIndexLoading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isIndexLoading && "Indexing...."}
              {!isIndexLoading &&
                botDetails &&
                botDetails.is_index_created &&
                "Update Index"}
              {!isIndexLoading &&
                botDetails &&
                !botDetails.is_index_created &&
                "Create Index"}
            </Button>
            {botDetails && botDetails.is_index_created && (
              <Link
                to={`/bot/${botDetails.bot_username}/chat`}
                className="mx-1"
              >
                <Button variant="warning">Start Chat</Button>
              </Link>
            )}
          </div>
        </>
      )}
      {botDetails && !botResources && (
        <Spinner animation="grow" variant="info" />
      )}
    </Page>
  );
}

export default BotDetails;
