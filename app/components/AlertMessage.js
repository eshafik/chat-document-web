import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertMessage(props) {
  return (
    <>
      <Alert key="danger" variant="danger">
        {props.message}
      </Alert>
    </>
  );
}

export default AlertMessage;
