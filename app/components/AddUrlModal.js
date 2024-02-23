import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useParams } from 'react-router-dom';

import AlertMessage from './AlertMessage';
import axiosInstance from '../api_call';
import DispatchContext from '../DispatchContext';

function AddUrlModal(props) {
    const [urlText, setUrlText] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const {id} = useParams();
    const appDispatch = useContext(DispatchContext);

    function isValidUrl(url) {
        try {
          new URL(url);
          return true;
        } catch (error) {
          return false;
        }
      }

    const handleSave = (e) => {
        e.preventDefault();
        if (!urlText){
          setAlertMessage("You can not save empty url");
        }else if (!isValidUrl(urlText)){
            setAlertMessage("Invalid URL format");
        }
        else{
          const data = {
            bot_id: id,
            urls: [urlText]
          }
          axiosInstance.post('/bot/resource/', data, {appDispatch})
          .then(response => {
            console.log("Add url response", response);
            props.onHide();
            props.setnewresource(response.data.data.id);
          }).catch(error => {
            console.log("error: ", error);
          })
        }
      }

  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Upload Document
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Website URL</Form.Label>
        <Form.Control type="email" placeholder="https://example.com" onChange={
            (e) => {setUrlText(e.target.value); setAlertMessage(null);}
        } />
      </Form.Group>
      {alertMessage && <AlertMessage show={false} message={alertMessage}/>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddUrlModal