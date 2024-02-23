import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Tooltip as ReactTooltip } from "react-tooltip";

import DeleteConfirmation from "./DeleteConfirmation";

function ResourceList(props) {
  const [deleteModal, setDeleteModal] = useState(false);

  function truncateString(str, length) {
    if (str.length <= length) {
      return str;
    }
    const firstPart = str.substring(0, 20);
    const lastPart = str.substring(str.length - 20);
    const middlePart = " ............ ";
    return firstPart + middlePart + lastPart;
  }

  return (
    <>
      <Table
        striped
        hover
        size="sm"
        bordered={false}
        borderless={true}
        responsive="sm"
      >
        <tbody>
          {props.resources &&
            props.resources.map((resource) => {
              const name =
                resource.resource_type === "document"
                  ? resource.file.split("/").slice(-1)[0]
                  : resource.url;
              return (
                <tr key={resource.id}>
                  <td data-tooltip-id={resource.id} data-tooltip-content={name}>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li>{truncateString(name, 40)}</li>
                    </ul>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => setDeleteModal(true)}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </td>
                  <DeleteConfirmation
                    show={deleteModal}
                    handleClose={() => setDeleteModal(!deleteModal)}
                    newresource={props.newresource}
                    setnewresource={props.setnewresource}
                    resourceId={resource.id}
                  />
                </tr>
              );
            })}
        </tbody>
      </Table>
      {props.resources &&
        props.resources.map((resource) => (
          <ReactTooltip
            key={resource.id}
            place="top"
            id={resource.id}
            className="custom-tooltip"
          />
        ))}
    </>
  );
}

export default ResourceList;
