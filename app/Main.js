import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import Home from "./components/Home";
import FlashMessages from "./components/FlashMessages";
import BotCreate from "./components/BotCreate";
import BotDetails from "./components/BotDetails";
import ChatWindow from "./components/ChatWindow";

Axios.defaults.baseURL = "http://13.229.46.229:7001/api/v1";

function Main() {
  const initialState = {
    isLoggedIn: Boolean(localStorage.getItem("ChatDocumentToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("ChatDocumentToken"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.isLoggedIn = true;
        draft.user = action.data;
        console.log("user data", action.data);
        break;
      case "logout":
        draft.isLoggedIn = false;
        break;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem("ChatDocumentToken", state.user.token);
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.user.token}`;
    } else {
      localStorage.removeItem("ChatDocumentToken");
    }
  }, [state.isLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.isLoggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/bot/create" element={<BotCreate />} />
            <Route path="/bot/:id" element={<BotDetails />} />
            <Route path="/bot/:username/chat" element={<ChatWindow />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
