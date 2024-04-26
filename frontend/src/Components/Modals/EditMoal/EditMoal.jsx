import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './EditMoal.css'
import CloseModalEsc from '../CloseModalEsc';

export default function EditMoal({ children, onClose, onSubmit, title }) {

    useEffect(() => {
        CloseModalEsc(onClose)
    })

    return ReactDOM.createPortal(
        <div className='modal-parent active'>
            <form className='edit-modal-form'>
                <h1>{title}</h1>
                {children}

                <button className='edit-form-submit' onClick={onSubmit}>ثبت اطلاعات جدید</button>
            </form>
        </div>,
        document.getElementById('modals-parent')
    )
}
