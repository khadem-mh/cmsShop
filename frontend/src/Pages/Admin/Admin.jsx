import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import './Admin.css'
import AdminInput from '../../Components/AdminInput/AdminInput'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty';
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal';
import { BtnClickContext } from '../../Contexts/BtnClickContext';
//

export default function Admin() {
    const location = useLocation()
    const [adminID, setAdminID] = useState(null)
    const [allAdmins, setAllAdmins] = useState([])
    const [isShowDeleteAdmin, setIsShowDeleteAdmin] = useState(false)
    const [isMainAdminManager, setIsMainAdminManager] = useState(false)
    const [btnEditAdmin, setBtnEditAdmin] = useContext(BtnClickContext)
    const [managerInfos, setManagerInfos] = useState([])

    useEffect(() => {
        if (localStorage.getItem('admin-infos')) {
            setManagerInfos(JSON.parse(localStorage.getItem('admin-infos')).img)

            let mainAdmin = JSON.parse(localStorage.getItem('admin-infos'))

            fetch(`http://localhost:8000/api/admins`, {
                method: 'GET',
                headers: {
                    'adminname': mainAdmin.username,
                    'adminpassword': mainAdmin.password,
                }
            })
                .then(res => res.json())
                .then(admin => {
                    if (admin.length) {
                        if (admin[0].isMainAdmin) setIsMainAdminManager(true)
                    }
                })
        }
    }, [])

    useEffect(() => {
        isMainAdminManager &&
            getAllAdmins()
    }, [allAdmins, isMainAdminManager])

    useEffect(() => {
        if (location.pathname === '/admin') {
            if (btnEditAdmin) {
                let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))
                setManagerInfos(adminInfos.img)
                setBtnEditAdmin(false)

            }
        }
    })

    const getAllAdmins = () => {
        fetch(`http://localhost:8000/api/admins/getAdmins`)
            .then(res => res.json())
            .then(admins => {
                setAllAdmins(admins)
            })
    }

    const submitDeleteAdmin = () => {
        fetch(`http://localhost:8000/api/admins/${adminID}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setIsShowDeleteAdmin(false)
                    getAllAdmins()
                }
            })
    }


    return (
        <section>
            <div className='container-table-admin'>
                {
                    managerInfos && <img src={managerInfos} alt="image-admins" className='img-admin-page' />
                }
                <AdminInput
                    textBtnForm={'ویرایش حساب'}
                    titleForm={'ویرایش حساب مدیریت'}
                    isEditAdmin={true}
                />
            </div>
            {
                isMainAdminManager &&
                <AdminInput textBtnForm={'اضافه کردن'} titleForm={'اضافه کردن مدیر'} />
            }

            {
                isMainAdminManager &&
                <div>
                    {allAdmins.length ?
                        (
                            <>
                                <h1 className='products-title'>لیست مدیرها</h1>
                                <div className='parent-table table-users'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope="col">عکس مدیر</th>
                                                <th scope="col">نام و نام خوانوادگی</th>
                                                <th scope="col">نام کاربری</th>
                                                <th scope="col">رمز عبور</th>
                                                <th scope="col">حرفه</th>
                                                <th scope="col">حذف مدیر</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                allAdmins.map(admin => (
                                                    <tr key={admin.id}>
                                                        <td><img src={admin.img} alt="image-admin" className='products-table-img' /></td>
                                                        <td>{admin.firstname}-{admin.lastname}</td>
                                                        <td>{admin.username}</td>
                                                        <td>{admin.password}</td>
                                                        <td>{admin.task}</td>
                                                        <td>
                                                            <button className='products-table-btn' onClick={() => {
                                                                setIsShowDeleteAdmin(true)
                                                                setAdminID(admin.id)
                                                            }}>حذف مدیر</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                        :
                        (<ErrorBoxEmpty msg={'هیچ مدیری یافت نشد'} />)
                    }
                </div>
            }

            {isShowDeleteAdmin && (
                <DeleteModal cancleAction={() => setIsShowDeleteAdmin(false)} submitAction={submitDeleteAdmin} title={'آیا از حذف مدیر اطمینان دارید'} />
            )}

        </section>
    )
}
