import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../StateContext";

const useRequireAuth = () => {
  const navigate = useNavigate();
  const appState = useContext(StateContext);

  useEffect(() => {
    if (!appState.isLoggedIn) {
      navigate("/");
    }
  }, [appState.isLoggedIn, navigate]);
};

export default useRequireAuth;
