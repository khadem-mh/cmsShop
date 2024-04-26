import React, { useState, useEffect, useContext } from 'react'
import './Orders.css'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'
import DetailsModal from '../../Components/Modals/DetailsModal/DetailsModal'
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import { getOrdersTotalPrice } from '../../Contexts/InfosHomePage'
import getAllOrders from '../../Functions/getAllOrders'

export default function Orders() {
  //
  const [ordersTotalPrice, setOrdersTotalPrice] = useContext(getOrdersTotalPrice)
  //
  const [getOrders, setGetOrders] = useState([])
  const [isShowDetailsOrder, setIsShowDetailsOrder] = useState(false)
  const [isShowDetailsErrorAccepetOrder, setIsShowDetailsErrorAccepetOrder] = useState(false)
  const [isShowDeleteOrder, setIsShowDeleteOrder] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  //
  const [isActive, setIsActive] = useState(0)
  const [existProduct, setExistProduct] = useState(0)
  const [saleCount, setSaleCount] = useState(0)
  const [countProduct, setCountProduct] = useState(0)
  const [detailsBody, setDetailsBody] = useState({})
  const [orderId, setOrderId] = useState(null)
  const [productId, setProductId] = useState(null)

  useEffect(() => {
    getAllOrders(setGetOrders, setOrdersTotalPrice)
  }, [])

  const orderProduct = (saleCountProduct, countExistPrduct) => {
    fetch(`http://localhost:8000/api/orders/active-order/${orderId}/${isActive}`, {
      method: 'PUT',
    })
      .then(res => {
        if (res.ok) {

          const saleCountAmount = saleCountProduct

          fetch(`http://localhost:8000/api/orders/sale/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sale: countExistPrduct,
              saleCount: saleCountAmount,
            })
          })
            .then(res => {
              if (res.ok) {
                getAllOrders(setGetOrders, setOrdersTotalPrice)
                //
                fetch(`http://localhost:8000/api/products/productSale/${productId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    count: countExistPrduct,
                    sale: saleCountAmount,
                  })
                })
                  .then(res => res.json())
                //
              }
            })

        }
      })
  }

  const AcceptOrder = event => {
    event.preventDefault()

    if (existProduct > 0) {
      if (countProduct > existProduct) setIsShowDetailsErrorAccepetOrder(true)
      else {

        if (isActive === 0) {
          const countExist = existProduct + countProduct
          setExistProduct(countExist)
          const saleCountMin = saleCount - countProduct
          orderProduct(saleCountMin, countExist)
        } else {

          const countExist = existProduct - countProduct
          setExistProduct(countExist)
          const saleCountPlus = saleCount + countProduct
          orderProduct(saleCountPlus, countExist)
        }
      }
    }
    else setIsShowDetailsErrorAccepetOrder(true)

    setIsShowAcceptModal(false)
  }

  const submitDeleteOrder = () => {
    fetch(`http://localhost:8000/api/orders/${orderId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setIsShowDeleteOrder(false)
          getAllOrders(setGetOrders, setOrdersTotalPrice)
        }
      })
  }

  const setDelete = (remove) => {
    remove(false)
  }

  return (
    <>
      <div>
        {
          getOrders.length ?
            (
              <>
                <h1 className='products-title'>سفارشات</h1>
                <div className='parent-table table-users'>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">نام محصول</th>
                        <th scope="col">نام مشتری</th>
                        <th scope="col">تاریخ</th>
                        <th scope="col">ساعت</th>
                        <th scope="col">تعداد سفارش</th>
                        <th scope="col">تخفیف</th>
                        <th scope="col">قیمت تخفیف خورده</th>
                        <th scope="col">کنترل</th>
                      </tr>
                    </thead>

                    <tbody>
                      {getOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.productID}</td>
                          <td>{order.userID}</td>
                          <td>{order.date}</td>
                          <td>{order.hour}</td>
                          <td>{order.count} عدد</td>
                          <td>{order.off} %</td>
                          <td>{order.off === 0 ? 'تخیف ندارد' : (
                            order.price - (order.price * order.off / 100)
                          )}</td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setOrderId(order.id)
                              setIsShowDeleteOrder(true)
                            }}>حذف</button>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDetailsOrder(true)
                              setDetailsBody(order)
                            }}>جزئیات</button>

                            {
                              order.isActive === 1 ?
                                (
                                  <button className='products-table-btn' onClick={() => {
                                    setIsShowAcceptModal(true)
                                    setOrderId(order.id)
                                    setProductId(order.productID)
                                    setIsActive(0)
                                    setExistProduct(order.sale)
                                    setSaleCount(order.saleCount)
                                    setCountProduct(order.count)
                                  }}>رد سفارش</button>
                                )
                                :
                                (
                                  <button className='products-table-btn' onClick={() => {
                                    setIsShowAcceptModal(true)
                                    setOrderId(order.id)
                                    setProductId(order.productID)
                                    setIsActive(1)
                                    setExistProduct(order.sale)
                                    setSaleCount(order.saleCount)
                                    setCountProduct(order.count)
                                  }}>تایید سفارش</button>
                                )
                            }

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
            :
            (<ErrorBoxEmpty msg={'هیچ سفارشی یافت نشد'} />)
        }
      </div>

      {
        isShowDetailsErrorAccepetOrder &&
        <DetailsModal onHide={() => setIsShowDetailsErrorAccepetOrder(false)} tdIntoTbody={[`خطا : این محصول در انبار موجود نمی باشد موجودی انبار هست : ${existProduct}`]} />
      }

      {isShowDetailsOrder && (
        <DetailsModal onHide={() => setIsShowDetailsOrder(false)} tHead={['موجودی', 'محبوبیت', 'قیمت', 'فروش رفته']} tdIntoTbody={[detailsBody.sale, detailsBody.popularity, detailsBody.price, detailsBody.saleCount]} />
      )}

      {isShowDeleteOrder && (
        <DeleteModal cancleAction={() => setDelete(setIsShowDeleteOrder)} submitAction={submitDeleteOrder} title={'آیا از حذف کاربر اطمینان دارید'} />
      )}

      {
        isShowAcceptModal && <DeleteModal cancleAction={() => setDelete(setIsShowAcceptModal)} submitAction={AcceptOrder} title={'آیا از تایید یا رد سفارش اطمینان دارید'} />
      }

    </>

  )
}
