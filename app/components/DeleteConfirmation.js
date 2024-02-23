import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../api_call";
import DispatchContext from "../DispatchContext";

function DeleteConfirmation(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const appDispatch = useContext(DispatchContext);

  function HandleDelete(e) {
    e.preventDefault();
    setIsDeleting(true);
    axiosInstance
      .delete(`bot/resource/${props.resourceId}`, { appDispatch })
      .then((response) => {
        console.log("delete response", response.data.data);
        props.setnewresource(!props.newresource);
        setIsDeleting(false);
        props.handleClose();
      });
  }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={HandleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
