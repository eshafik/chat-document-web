import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import getRandomAvatar from '../randomAvatar';

function HeaderLoggedIn(props) {
    const appDispatch = useContext(DispatchContext);
    const appState = useContext(StateContext)

    function handleLogout(e) {
        e.preventDefault();
        appDispatch({type: "logout"})
    }
  return (
    <div className="flex-row my-3 my-md-0">
          <button onClick={handleLogout} className="btn btn-sm btn-secondary">
            Sign Out
          </button>
    </div>
  )
}

export default HeaderLoggedIn;