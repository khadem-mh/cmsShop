import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./DetailsModal.css";
import CloseModalEsc from "../CloseModalEsc";

export default function DetailsModal({ onHide, tHead, tdIntoTbody }) {

  const [tHeadItem] = useState(tHead)
  const [tdIntoTbodyItem] = useState(tdIntoTbody)

  useEffect(() => {
    CloseModalEsc(onHide)
  })

  useEffect(() => {
    let eX = 0
    let eY = 0

    const closeHandler = e => {
      eX += e.x
      eY += e.y
      if (eX !== e.x || eY !== e.y) onHide()
    }

    window.addEventListener('click', closeHandler)
    return () => window.removeEventListener('click', closeHandler)
  })

  return ReactDOM.createPortal(
    <div className="modal-parent active">
      <div className="details-modal">
        <table className="cms-table">

          <thead>
            <tr>
              {
                tHeadItem && tHeadItem.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
              }
            </tr>
          </thead>

          <tbody>
            <tr>
              {
                tdIntoTbodyItem && tdIntoTbodyItem.map((item, index) => (
                  <td key={index}>{item}</td>
                ))
              }
            </tr>
          </tbody>

        </table>
      </div>
    </div>,
    document.getElementById('modals-parent')
  )
}
