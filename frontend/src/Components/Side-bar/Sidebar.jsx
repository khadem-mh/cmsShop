import React, { useState } from 'react'
import './Sidebar.css'
import './media.css'
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BsBagCheck, BsCurrencyDollar } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import DeleteModal from '../Modals/DeleteModal/DeleteModal';

export default function Sidebar() {

    const [logout, setLogout] = useState(false)

    const logoutHandle = e => {
        e.preventDefault()
        setLogout(true)
    }

    const logoutLogic = () => {
        localStorage.removeItem('admin-infos')
        window.location.reload(false);
    }

    return (
        <>
            <section className="sidebar">
                <div className='sidebar-div'>
                    <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>

                    <ul className="sidebar-links">
                        <li >
                            <NavLink to="/" className={`sidebar-links__link`}>
                                <AiOutlineHome className="icon" />
                                <span>صفحه اصلی</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/products" className={`sidebar-links__link`} >
                                <MdProductionQuantityLimits className="icon" />
                                <span>محصولات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/comments" className={`sidebar-links__link`}>
                                <BiCommentDetail className="icon" />
                                <span>کامنت ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/users" className={`sidebar-links__link`}>
                                <FiUsers className="icon" />
                                <span>کاربران</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/orders" className={`sidebar-links__link`}>
                                <BsBagCheck className="icon" />
                                <span>سفارشات</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/offs" className={`sidebar-links__link`}>
                                <BsCurrencyDollar className="icon" />
                                <span>تخفیف ها</span>
                            </NavLink>
                        </li>
                        <li >
                            <a href="/" className={`sidebar-links__link`} onClick={e => logoutHandle(e)}>
                                <IoLogOutOutline className="icon" />
                                <span>خروج</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            {
                logout &&
                <DeleteModal title={'آیا از خروج خود اطمینان دارید؟'} cancleAction={() => setLogout(false)} submitAction={logoutLogic} />
            }

        </>
    )

}
