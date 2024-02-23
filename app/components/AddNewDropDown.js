import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import UploadModal from "./UploadModal";
import AddUrlModal from "./AddUrlModal";

function AddNewDropDown(props) {
  const [modalShow, setModalShow] = useState(false);
  const [urlModalShow, setURLModalShow] = useState(false);

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Add Resource">
        <Dropdown.Item onClick={() => setModalShow(!modalShow)}>
          Upload PDF
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setURLModalShow(!urlModalShow)}>
          Add URL
        </Dropdown.Item>
      </DropdownButton>
      <UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newresource={props.newresource}
        setnewresource={props.setnewresource}
      />
      <AddUrlModal
        show={urlModalShow}
        onHide={() => setURLModalShow(false)}
        newresource={props.newresource}
        setnewresource={props.setnewresource}
      />
    </>
  );
}

export default AddNewDropDown;
