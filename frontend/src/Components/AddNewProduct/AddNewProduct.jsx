import React, { useState } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { SlBasketLoaded } from "react-icons/sl";
import { BsBalloonHeartFill } from "react-icons/bs";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";

export default function AddNewProduct({ getAllProducts }) {

    const [inpName, setInpName] = useState('')
    const [inpCount, setInpCount] = useState('')
    const [inpPopularity, setInpPopularity] = useState('')
    const [inpColors, setInpNameColors] = useState('')
    const [inpPrice, setInpPrice] = useState('')
    const [inpImg, setInpImg] = useState('')
    const [inpSale, setInpSale] = useState('')

    const newProductsInfos = {
        title: inpName,
        price: inpPrice,
        count: inpCount,
        img: inpImg,
        popularity: inpPopularity,
        sale: inpSale,
        colors: inpColors,
    }

    const sendNewProduct = e => {

        e.preventDefault()

        fetch(`http://localhost:8000/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductsInfos)
        })
            .then(res => res.json())
            .then(() => {
                getAllProducts('')
                setInpName('')
                setInpCount('')
                setInpPopularity('')
                setInpNameColors('')
                setInpPrice('')
                setInpImg('')
                setInpSale('')
            })

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن محصول جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={inpName} setValInp={setInpName} cildren={<SiNamecheap />} placeHolderInp='اسم محصول' />
                    <InputEditModal valInp={inpCount} setValInp={setInpCount} cildren={<SlBasketLoaded />} placeHolderInp='موجودی محصول' />
                    <InputEditModal valInp={inpPopularity} setValInp={setInpPopularity} cildren={<BsBalloonHeartFill />} placeHolderInp='میزان محبوبیت محصول' />
                    <InputEditModal valInp={inpColors} setValInp={setInpNameColors} cildren={<MdOutlineFormatColorFill />} placeHolderInp='تعداد رنگ بندی محصول' />
                    <InputEditModal valInp={inpPrice} setValInp={setInpPrice} cildren='$$' placeHolderInp='قیمت محصول' />
                    <InputEditModal valInp={inpImg} setValInp={setInpImg} cildren={<FaRegImage />} placeHolderInp='آدرس عکس محصول' />
                    <InputEditModal valInp={inpSale} setValInp={setInpSale} cildren={<GoPersonFill />} placeHolderInp='میزان فروش محصول' />
                </div>
                <button className='add-com-submit' onClick={sendNewProduct}>ثبت محصول</button>
            </form>
        </div>
    )
}
