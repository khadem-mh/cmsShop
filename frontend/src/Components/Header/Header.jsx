import React, { useState } from 'react'
import './Header.css'
import './media.css'
import { Row, Col } from 'react-bootstrap'
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessHigh } from 'react-icons/bs'
import { IoSearch } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export default function Header({ children , isLightMode, setIsLightMode}) {

    const handleButtonClick = () => {
        setIsLightMode(prev => {
            localStorage.setItem('light-mode', JSON.stringify(`${!prev}`))
            return !prev
        });
        document.documentElement.classList.toggle('light-mode')

    };

    return (
        <>
            <section className='parent-header'>
                <Row className='header'>

                    {children}

                    <Col className='header-left-section'>
                        <button className='header-left-icon search-icon-nav d-auto d-md-none'>
                            <IoSearch className='header-icon' />
                        </button>

                        <div className={`search-box`}>
                            <input type="text" placeholder='جست و جو بکنید ...' />
                            <button>جست و جو</button>
                        </div>

                        <button className='header-left-icon'>
                            <AiOutlineBell className='header-icon' />
                        </button>
                        <button className='header-left-icon' onClick={handleButtonClick} >
                            {isLightMode ? <BsBrightnessHigh className='header-icon' /> : <IoMoonOutline className='header-icon' />}
                        </button>
                    </Col>
                </Row>
            </section>
        </>
    )
}
