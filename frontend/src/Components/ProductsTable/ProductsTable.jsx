import React, { useState } from 'react'
import './ProductsTable.css'
import './media.css'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import DetailsModal from '../Modals/DetailsModal/DetailsModal'
import EditMoal from '../Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import InputEditModal from '../InputEditModal/InputEditModal'
import { FaDollarSign, FaSortAmountUp } from "react-icons/fa";
import { MdInventory, MdInvertColors, MdOutlineFavorite, MdOutlinePhotoSizeSelectActual, MdOutlineTitle } from "react-icons/md";

export default function ProductsTable({ allProducts, getAllProducts }) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const [productID, setProductID] = useState(null)
    const [detailsProduct, setDetailsProduct] = useState({})

    const [productTitle, setProductTitle] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCount, setProductCount] = useState('')
    const [productImg, setProductImg] = useState('')
    const [productPopularity, setProductPopularity] = useState('')
    const [productSale, setProductSale] = useState('')
    const [productColors, setProductColors] = useState('')

    const closeDetailsModal = () => {
        setIsShowDetailsModal(false)
    }

    const deleteModalCancleAction = () => {
        console.log('Cancle');
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    getAllProducts()
                    setIsShowDeleteModal(false)
                }
            })
    }

    const updateProductInfos = event => {
        event.preventDefault()

        const productsUpdateInfos = {
            title: productTitle,
            price: productPrice,
            count: productCount,
            img: productImg,
            popularity: productPopularity,
            sale: productSale,
            colors: productColors,
        }

        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsUpdateInfos)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                getAllProducts()
            })
        setIsShowEditModal(false)
    }

    return (
        <div>
           {allProducts.length &&  <h1 className='products-title title-pr'>محصولات</h1>}
            <div className='parent-table'>
                {
                    allProducts.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">عکس</th>
                                    <th scope="col">اسم</th>
                                    <th scope="col">قیمت</th>
                                    <th scope="col">موجودی</th>
                                    <th scope="col">کنترل</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    allProducts && allProducts.map(product => (
                                        <tr key={product.id}> 
                                            <td>
                                                <img src={product.img} alt={product.url} className='products-table-img' />
                                            </td>
                                            <td>{product.title}</td>
                                            <td>{product.price} تومان</td>
                                            <td>{product.count === 0 ? 'ناموجود' : product.count}</td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setIsShowDetailsModal(true)
                                                    setDetailsProduct(product)
                                                }}>جزییات</button>
                                                <button className='products-table-btn' onClick={() => {
                                                    setIsShowDeleteModal(true)
                                                    setProductID(product.id)
                                                }}>حذف</button>
                                                <button className='products-table-btn' onClick={() => {
                                                    setIsShowEditModal(true)
                                                    setProductID(product.id)
                                                    setProductTitle(product.title)
                                                    setProductPrice(product.price)
                                                    setProductCount(product.count)
                                                    setProductImg(product.img)
                                                    setProductPopularity(product.popularity)
                                                    setProductSale(product.sale)
                                                    setProductColors(product.colors)
                                                }}>ویرایش</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <ErrorBoxEmpty msg={'هیچ محصولی یافت نشد'} />
                }
                {isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancleAction={deleteModalCancleAction} title='آیا از حذف محصول اطمینان دارید' />}
                {isShowDetailsModal && <DetailsModal onHide={closeDetailsModal} tHead={['ID', 'محبوبیت', 'فروش', 'رنگ ها']} tdIntoTbody={[detailsProduct.id, detailsProduct.popularity, detailsProduct.sale, detailsProduct.colors]}/> }
                {isShowEditModal &&
                    <EditMoal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfos} title={'اطلاعات جدید را وارد نمایید'}>

                        <InputEditModal setValInp={setProductTitle} valInp={productTitle} cildren={<MdOutlineTitle />} placeHolderInp={"عنوان "} />
                        <InputEditModal setValInp={setProductPrice} valInp={productPrice} cildren={<FaDollarSign />} placeHolderInp={"مبلغ "} />
                        <InputEditModal setValInp={setProductCount} valInp={productCount} cildren={<FaSortAmountUp />} placeHolderInp={"موجودی "} />
                        <InputEditModal setValInp={setProductImg} valInp={productImg} cildren={<MdOutlinePhotoSizeSelectActual />} placeHolderInp={"آدرس کاور "} />
                        <InputEditModal setValInp={setProductPopularity} valInp={productPopularity} cildren={<MdOutlineFavorite />} placeHolderInp={"میزان محبوبیت "} />
                        <InputEditModal setValInp={setProductSale} valInp={productSale} cildren={<MdInventory />} placeHolderInp={"میزان فروش "} />
                        <InputEditModal setValInp={setProductColors} valInp={productColors} cildren={<MdInvertColors />} placeHolderInp={"تعداد رنگ بندی "} />

                    </EditMoal>
                }
            </div>
        </div>
    )
}
