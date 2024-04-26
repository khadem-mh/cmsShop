import React, { useState, useEffect } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { FaMountainCity } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

const cityes = ['آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز', 'ایلام', 'بوشهر', 'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی', 'خراسان رضوی', 'خراسان شمالی', 'خوزستان', 'زنجان', 'سمنان', 'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان', 'کرمان', 'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان', 'لرستان', 'مازندران', 'مرکزی', 'هرمزگان', 'همدان', 'یزد']

export default function AddNewUser({ getAllUsers }) {

    const [inpFirstname, setInpFirstname] = useState('')
    const [inpLastname, setInpLastname] = useState('')
    const [inpUsername, setInpUsername] = useState('')
    const [inpPassword, setInpPassword] = useState('')
    const [inpPhone, setInpPhone] = useState("")
    const [inpEmail, setInpEmail] = useState('')
    //
    const [isPost, setIsPost] = useState(false)
    const [cityName, setCityName] = useState('-1')
    const [selectEventCity, setSelectEventCity] = useState('')

    const sendNewUser = e => {
        e.preventDefault()

        const newUserInfos = {
            firsname: inpFirstname,
            lastname: inpLastname,
            username: inpUsername,
            password: inpPassword,
            phone: +inpPhone,
            city: cityName,
            email: inpEmail,
        }

        fetch(`http://localhost:8000/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfos)
        })
            .then(res => res.json())
            .then(() => {
                getAllUsers()
                setIsPost(true)
                setCityName('-1')
                setInpFirstname("")
                setInpLastname("")
                setInpUsername("")
                setInpPassword("")
                setInpPhone("")
                setInpEmail("")
            })

    }

    const funChange = (e, fun) => {
        if (e.target.value === -1 && isPost) e.target.value = -1
        else fun(e.target.value)
    }

    useEffect(() => {
        if (isPost) {
            selectEventCity.target.value = -1
            setIsPost(false)
        }
    }, [isPost])

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن کاریر جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={inpFirstname} setValInp={setInpFirstname} cildren={< SiNamecheap />} placeHolderInp='اسم کاربر' />
                    <InputEditModal valInp={inpLastname} setValInp={setInpLastname} cildren={< SiNamecheap />} placeHolderInp='فامیل کاربر' />
                    <InputEditModal valInp={inpUsername} setValInp={setInpUsername} cildren={< FaUser />} placeHolderInp='نام کاربری' />
                    <InputEditModal valInp={inpPassword} setValInp={setInpPassword} cildren={< PiPasswordDuotone />} placeHolderInp='رمز عبور' />
                    <InputEditModal valInp={inpPhone} setValInp={setInpPhone} cildren={<FaPhoneAlt />} placeHolderInp='شماره تلفن' />
                    <select className="form-select" onChange={e => {
                        funChange(e, setCityName)
                        setSelectEventCity(e)
                    }}>
                        <option value="-1">انتخاب شهر</option>
                        {cityes.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    <InputEditModal valInp={inpEmail} setValInp={setInpEmail} cildren={< MdAlternateEmail />} placeHolderInp='ایمیل کاربر' />
                </div>
                <button className='add-com-submit' onClick={(e) => sendNewUser(e)}>اضافه کردن کاربر</button>
            </form>
        </div>
    )

}
