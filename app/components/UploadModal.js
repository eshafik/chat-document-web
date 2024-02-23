import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useParams } from 'react-router-dom';

import AlertMessage from './AlertMessage';
import axiosInstance from '../api_call';
import DispatchContext from '../DispatchContext';



function UploadModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const {id} = useParams();
  const appDispatch = useContext(DispatchContext);

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedFile){
      setAlertMessage("You can not save without upload pdf file");
    }else{
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('bot_id', id);
      console.log("Hello...");
      axiosInstance.post('/bot/resource/', formData, {appDispatch})
      .then(response => {
        console.log("Upload response", response);
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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>PDF Document</Form.Label>
        <Form.Control type="file" onChange={(e)=>{
          console.log("file", e.target.files[0]);
          const uploadedFile = e.target.files[0]
          if (uploadedFile.type !== "application/pdf"){
            setAlertMessage("Only pdf file is allowed to upload!")
          }else if(uploadedFile.size > 5000000){
            setAlertMessage("Maximum 5 MB is allowed to upload!");
          }
          else{
            setSelectedFile(e.target.files[0]); setAlertMessage(null)
          }
          }}/>
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

export default UploadModal;