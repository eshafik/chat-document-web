import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Page from "./Page";
import useRequireAuth from "../hoc/Auth";
import DispatchContext from "../DispatchContext";
import axiosInstance from "../api_call";
import { useNavigate } from "react-router-dom";

function BotCreate() {
  useRequireAuth();

  const [name, setName] = useState();
  const [apiKey, setAPIKey] = useState();
  const [hasNameValue, setNameValue] = useState(true);

  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      setNameValue(false);
    } else {
      console.log(name, apiKey);
      let data = { bot_name: name };
      if (apiKey) {
        data.open_api_key = apiKey;
      }
      console.log("data", data);
      axiosInstance
        .post("/bot/profile/", data, { appDispatch })
        .then((response) => {
          console.log("response", response.data.data);
          navigate(`/bot/${response.data.data.id}`);
        })
        .catch((error) => {
          console.log("error API call", error);
        });
    }
  }
  return (
    <Page title="Create Bot">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="text-muted mb-1">
            <small>Bot Name</small>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            autoFocus
            name="name"
            id="name"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
          <CSSTransition
            in={!hasNameValue}
            timeout={10}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="alert alert-danger small liveValidateMessage">
              Bot name is required!{" "}
            </div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <label htmlFor="openai" className="text-muted mb-1">
            <small>OpenAI API Key (Optional)</small>
          </label>
          <input
            onChange={(e) => setAPIKey(e.target.value)}
            autoFocus
            name="apiKey"
            id="openai"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </Page>
  );
}

export default BotCreate;
