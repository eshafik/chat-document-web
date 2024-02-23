import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


import Page from './Page';
import useRequireAuth from '../hoc/Auth';
import axiosInstance from '../api_call';
import AddNew from './AddNew';
import AddNewDropDown from './AddNewDropDown';
import UploadModal from './UploadModal';
import ResourceList from './ResourceList';
import DispatchContext from '../DispatchContext';



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
        axiosInstance.post('/bot/index/', {bot_id: id})
        .then(response=>{
            console.log("index response", response.data.data);
            setChangeBotDetails(!changeBotDetails);
            setIsIndexLoading(false);
        })
        .catch(error=>{
            console.log("Error", error.response.data)
        })
    }

    useEffect(() => {
        axiosInstance.get(`/bot/profile/${id}/`, {appDispatch})
        .then(response => {
            console.log("response", response.data.data);
            setBotDetails(response.data.data);
        })
        .catch(error => {
            console.log("error", error)
        })
    }, [changeBotDetails])
    useEffect(() => {
        axiosInstance.get(`bot/resource?bot_id=${id}`, {appDispatch})
        .then(response => {
            console.log("response", response.data.data);
            setBotResources(response.data.data);
        })
        .catch(error => {
            console.log("error", error)
        })
    }, [newResource])
  return (
    <Page title="Bot Details">
      <div className="d-flex justify-content-between">
        {
            botDetails && (
                <>
                <h2 className="bottom-margin">Bot Name: {botDetails.bot_name}</h2>
                <span className="pt-2">
                <AddNewDropDown newresource={newResource} setnewresource={setNewResource}/>
                </span>
                </>
            )
        }
        {
            !botDetails && (
                <h2>Loading....</h2>
            )
        }
      </div>
      {
        botResources && 
            (   
                <>
                <ResourceList resources={botResources} newresource={newResource} setnewresource={setNewResource}/>
                <div className='d-flex justify-content-between'>
                <Button onClick={handleIndexClick}>
                    {/* {botDetails && botDetails.is_index_created?'Update Index': 'Create Index'} */}
                    {
                        isIndexLoading && (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                        )
                    }
                    {
                        isIndexLoading && "Indexing...."
                    }
                    {
                        !isIndexLoading && botDetails && botDetails.is_index_created && 'Update Index'
                    }
                </Button>
                {
                    botDetails && botDetails.is_index_created && (
                        <Button variant='warning'>Start Chat</Button>
                    )
                }
                </div>
                
                </>
            )
      }
      {
            botDetails && !botResources && (
                <h2>Loading....</h2>
            )
        }

    </Page>
  )
}

export default BotDetails