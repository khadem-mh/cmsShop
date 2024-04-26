import React, { useState, useEffect } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { MdOutlinePercent } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

export default function AddNewOff({ getAllOffs }) {

    const [offCode, setOffCode] = useState('')
    const [offPercent, setOffPercent] = useState('')
    const [offIsActive, setOffIsActive] = useState('-1')
    //admin
    const [adminName, setAdminName] = useState('');
    const [adminID, setAdminID] = useState('');
    //product
    const [allProducts, setAllProducts] = useState([])
    const [productID, setProductID] = useState('-1')
    const [isPost, setIsPost] = useState(false)
    const [selectEventProduct, setSelectEventProduct] = useState('')
    const [selectEventActive, setSelectEventActive] = useState('')
    //

    useEffect(() => {
        if (localStorage.getItem('admin-infos')) {
            let admin = JSON.parse(localStorage.getItem('admin-infos'))
            setAdminName(`${admin.firstname} ${admin.lastname}`)
            setAdminID(admin.id)
            getAllProducts()
        }
    }, [offIsActive])

    const funChange = (e, fun) => {
        if (e.target.value >= 0) fun(+e.target.value)
        if (e.target.value === -1 && isPost) e.target.value = -1
    }

    useEffect(() => {
        if (isPost) {
            selectEventProduct.target.value = -1
            selectEventActive.target.value = -1
            setIsPost(false)
        }
    }, [isPost])

    const getAllProducts = () => {
        fetch("http://localhost:8000/api/products")
            .then(res => res.json())
            .then(products => setAllProducts(products))
    }

    const postInfosOff = event => {
        event.preventDefault()
        const date = new Date()
        const setNewOff = {
            code: offCode,
            percent: +offPercent,
            adminID: +adminID,
            productID: +productID,
            date: date.toLocaleDateString(),
            isActive: offIsActive,
        }

        fetch("http://localhost:8000/api/offs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setNewOff)
        })
            .then(res => res.json())
            .then(off => {
                getAllOffs()
                setOffCode('')
                setOffPercent('')
                setIsPost(true)
                setProductID('-1')
                setOffIsActive('-1')
            })

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن تخفیف جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={offCode} setValInp={setOffCode} cildren={<SiNamecheap />} placeHolderInp='کد تخفیف' />
                    <InputEditModal valInp={offPercent} setValInp={setOffPercent} cildren={<MdOutlinePercent />} placeHolderInp='درصد تخفیف' />
                    <InputEditModal valInp={adminName} setValInp={() => false} cildren={<RiAdminLine />} placeHolderInp='نام مدیر' dis={true} />

                    <select className="form-select" onChange={e => {
                        funChange(e, setProductID)
                        setSelectEventProduct(e)
                    }}>
                        <option value="-1">انتخاب محصول</option>
                        {
                            allProducts.length &&
                            (
                                allProducts.map(product => (
                                    <option key={product.id} value={`${product.id}`}>{product.title}</option>
                                ))
                            )
                        }
                    </select>

                    <select className="form-select" onChange={(e) => {
                        funChange(e, setOffIsActive)
                        setSelectEventActive(e)
                    }}>
                        <option value="-1">فعال یا غیر فعال کردن کد تخفیف</option>
                        <option value={`${0}`}>خیر</option>
                        <option value={`${1}`}>بله</option>
                    </select>
                </div>
                <button className='add-com-submit' onClick={(event) => postInfosOff(event)}>ثبت تخفیف</button>
            </form>
        </div>
    )
}
