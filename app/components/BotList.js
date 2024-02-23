import React, {useContext, useEffect, useState} from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import StateContext from '../StateContext';
import axiosInstance from '../api_call';
import getRandomAvatar from '../randomAvatar';
import useRequireAuth from '../hoc/Auth';
import DispatchContext from '../DispatchContext';



function BotList() {
    useRequireAuth();
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    const [botList, setBotList] = useState([])

    useEffect(() => {
        axiosInstance.get('/bot/profile', {appDispatch})
        .then(response => {
            console.log("response", response.data.data);
            setBotList(response.data.data)
        })
        .catch(error => {
            console.log("error API call", error)
        })
    }, [])


  return (

    <div className="list-group">
        {
            <div className="grid-container">
      {botList.map(botItem => {
        const avatar_url = getRandomAvatar(botItem.bot_username);
        return (
            (
        <div key={botItem.id} className="grid-item">
          <div className="circle">
            <img className="avatar-tiny" src={avatar_url} alt="Avatar" />
            <p>{botItem.bot_name}</p>
          </div>
        </div>
      )
        )
      })}
    </div>
        }

    </div>
  )
}

export default BotList;