import React, { useState, useEffect, useContext } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { BtnClickContext } from '../../Contexts/BtnClickContext';
import { SiNamecheap } from "react-icons/si";
import { FaUser, FaRegImage } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { FcParallelTasks } from "react-icons/fc";

export default function AdminInput({ titleForm, textBtnForm, isEditAdmin = false }) {

    const [btnEditAdmin, setBtnEditAdmin]= useContext(BtnClickContext) 
    let [managerInfos, setManagerInfos] = useState([])
    const [inpFirstname, setInpFirstname] = useState('')
    const [inpLastname, setInpLastname] = useState('')
    const [inpUsername, setInpUsername] = useState('')
    const [inpPassword, setInpPassword] = useState('')
    const [inpTask, setInpTask] = useState('')
    const [inpImg, setInpImg] = useState('')
    const [adminID, setAdminID] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('admin-infos')) setManagerInfos(JSON.parse(localStorage.getItem('admin-infos')))
    }, [])

    useEffect(() => {
        if (isEditAdmin) {
            setInpFirstname(managerInfos.firstname)
            setInpLastname(managerInfos.lastname)
            setInpUsername(managerInfos.username)
            setInpPassword(managerInfos.password)
            setInpTask(managerInfos.task)
            setInpImg(managerInfos.img)
            setAdminID(managerInfos.id)
        }
    }, [managerInfos])

    const addNewAdmin = e => {
        e.preventDefault()
        const newAdminInfos = {
            firstname: inpFirstname,
            lastname: inpLastname,
            username: inpUsername,
            password: inpPassword,
            task: inpTask,
            img: inpImg,
        }
        if (isEditAdmin === false) {

            fetch(`http://localhost:8000/api/admins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdminInfos)
            })
                .then(res => res.json())
                .then(() => {
                    setInpFirstname("")
                    setInpLastname("")
                    setInpUsername("")
                    setInpPassword("")
                    setInpTask("")
                    setInpImg("")
                })
        } else {
            console.log(newAdminInfos);
            console.log(managerInfos);
            fetch(`http://localhost:8000/api/admins/${adminID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdminInfos)
            })
                .then(admin => {
                    if (admin) {
                        setBtnEditAdmin(true)
                        let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))
                        adminInfos.firstname = inpFirstname
                        adminInfos.lastname = inpLastname
                        adminInfos.username = inpUsername
                        adminInfos.password = inpPassword
                        adminInfos.task = inpTask
                        adminInfos.img = inpImg
                        localStorage.setItem('admin-infos', JSON.stringify(adminInfos))
                    }
                })
        }

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>{titleForm}</h1>
            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal setValInp={setInpFirstname} valInp={inpFirstname} cildren={< SiNamecheap />} placeHolderInp='اسم مدیر' />
                    <InputEditModal setValInp={setInpLastname} valInp={inpLastname} cildren={< SiNamecheap />} placeHolderInp='فامیل مدیر' />
                    <InputEditModal setValInp={setInpUsername} valInp={inpUsername} cildren={< FaUser />} placeHolderInp='نام کاربری' />
                    <InputEditModal setValInp={setInpPassword} valInp={inpPassword} cildren={< PiPasswordDuotone />} placeHolderInp='رمز عبور' />
                    <InputEditModal setValInp={setInpTask} valInp={inpTask} cildren={< FcParallelTasks />} placeHolderInp='حرفه یا تخصص' />
                    <InputEditModal setValInp={setInpImg} valInp={inpImg} cildren={< FaRegImage />} placeHolderInp='آدرس مسیر عکس' />
                </div>
                <button className='add-com-submit' onClick={(e) => addNewAdmin(e)}>{textBtnForm}</button>
            </form>
        </div>
    )
}
