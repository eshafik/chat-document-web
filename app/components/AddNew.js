import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

function AddNew(props) {
  return (
    <div className="add-new-button text-center mt-3">
      <button
        data-tooltip-id={props.tooltipId}
        data-tooltip-content={props.toolTipContent}
        className="btn btn-light"
        onClick={props.handler}
      >
        <i className="fas fa-plus text-muted"></i>
      </button>
      <ReactTooltip
        place="bottom"
        id={props.tooltipId}
        className="custom-tooltip"
      />
    </div>
  );
}

export default AddNew;
