import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal({ submitAction, cancleAction, title }) {

  return ReactDOM.createPortal(
    <div className='modal-parent active'>
      <div className="delete-modal">
        <h1>{title}</h1>
        <div className="delete-modal-btns">
          <button className="delete-btn delete-modal-accept-btn" onClick={(e) => submitAction(e)}>بله</button>
          <button className="delete-btn delete-modal-reject-btn" onClick={() => cancleAction()}>خیر</button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
