import React, {useContext, useEffect, useState} from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';



import StateContext from '../StateContext';
import axiosInstance from '../api_call';
import getRandomAvatar from '../randomAvatar';
import useRequireAuth from '../hoc/Auth';
import DispatchContext from '../DispatchContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
                <Card style={{ width: '18rem' }} key={botItem.id}>
                    <Card.Img variant="top" src={avatar_url} />
                    <Card.Body>
                        <Card.Title>{botItem.bot_name}</Card.Title>
                        <Card.Text>
                        Fantastic Bot for your assistance!
                        </Card.Text>
                        <Link to={`/bot/${botItem.id}`}><Button variant="primary">Explore</Button></Link>
                    </Card.Body>
                </Card>
                
                )
            })}
        </div>
        }

    </div>
  )
}

export default BotList;