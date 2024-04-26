import React from 'react'
import './ErrorBoxEmpty.css'

export default function ErrorBoxEmpty({ msg }) {
    return (
        <div className='parent-err-msg'>
            <h1 className='err-msg'>{msg}</h1>
        </div>
    )
}
