import React, { useState, useEffect, useContext } from 'react'
import './Home.css'
import './media.css'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'
import { getDateShamsy, getDateStartMonth } from '../../Functions/getDate'
import { getOrdersTotalPrice, getProductNotExist, getProductsMaxBuy } from '../../Contexts/InfosHomePage'

export default function Home() {
  const [productsNotExist] = useContext(getProductNotExist)
  const [productsMaxBuyProduct] = useContext(getProductsMaxBuy)
  const [ordersTotalPrice] = useContext(getOrdersTotalPrice)
  const [allUsers, setAllUsere] = useState([])
  const [userMaxBuy, setUserMaxBuy] = useState({})
  let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))

  useEffect(() => {
    getAllUsers()
    console.log(productsMaxBuyProduct);
  }, [productsMaxBuyProduct])

  const getAllUsers = () => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(result => {
        setAllUsere(result)
        let buy = []
        let buyes = result.map(user => { return { [user.id]: user.buy } })
        let users = buyes.filter(userBuy => buy.push(userBuy[Object.keys(userBuy)]))
        let userIDMaxBuyFind = users.find(user => {
          if (user[Object.keys(user)] === Math.max(...buy)) return user
          return false
        })
        setUserMaxBuy(result[Object.keys(userIDMaxBuyFind)[0] - 1])
      })
  }

  return (
    <div className='container-home-page'>

      <h1 className='wellcom-back-admin-title'>خوش آمدید <strong>{adminInfos.firstname} {adminInfos.lastname}</strong> به پنل مدیریت</h1>

      <section className='container-box box-info-small'>

        <div className='box-infos-home box-infos-home-sale'>
          <h3 className='products-title title-pr'> فروش این ماه وبسایت </h3>
          <p style={{ marginTop: '1rem', marginBottom: '3rem' }}>از تاریخ {getDateStartMonth()} تا امروز {getDateShamsy()} بوده <span className='span-price-home'>{ordersTotalPrice === null ? '0 تومان' : ordersTotalPrice}</span> </p>
        </div>

        <div className='box-infos-home'>
          <h3 className='products-title title-pr'> تعداد کاربران وبسایت</h3>
          <p style={{ marginTop: '1rem', marginBottom: '3rem' }}>{allUsers.length} نفر</p>
        </div>

      </section>

      <section className='container-box'>

        <div>
          <h3 className='products-title title-pr'>بیش ترین محصول فروخته شده</h3>{/* 1 product */}
          {
            productsMaxBuyProduct ?
              (
                <div>
                  <div className='parent-table'>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">ID محصول</th>
                          <th scope="col">عکس</th>
                          <th scope="col">اسم</th>
                          <th scope="col">قیمت</th>
                          <th scope="col">موجودی</th>
                          <th scope="col">تعداد فروش</th>
                          <th scope="col">محبوبیت</th>
                        </tr>
                      </thead>

                      <tbody>

                        <tr>
                          <td>{productsMaxBuyProduct.id}</td>
                          <td>
                            <img src={productsMaxBuyProduct.img} alt={productsMaxBuyProduct.url} className='products-table-img' />
                          </td>
                          <td>{productsMaxBuyProduct.title}</td>
                          <td>{productsMaxBuyProduct.price} تومان</td>
                          <td>{productsMaxBuyProduct.sale}</td>
                          <td>{productsMaxBuyProduct.sale} عدد</td>
                          <td>{productsMaxBuyProduct.popularity} ♥</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              )
              :
              (
                <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                  <p>هیچ محصولی فعلا خرید نشده یا موجود نمی باشد ☻</p>
                </div>
              )
          }

        </div >

        <div>
          <h3 className='products-title title-pr'>محصول های ناموجود</h3>
          {
            productsNotExist.length ?
              (
                <div>
                  <div className='parent-table'>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">ID محصول</th>
                          <th scope="col">عکس</th>
                          <th scope="col">اسم</th>
                          <th scope="col">قیمت</th>
                          <th scope="col">موجودی</th>
                          <th scope="col">تعداد فروش</th>
                          <th scope="col">محبوبیت</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          (
                            productsNotExist.map(product => (
                              <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                  <img src={product.img} alt={product.url} className='products-table-img' />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price} تومان</td>
                                <td>{'ناموجود'}</td>
                                <td>{product.sale} عدد</td>
                                <td>{product.popularity} ♥</td>
                              </tr>
                            ))
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )
              :
              (
                <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                  <p>هیچ محصولی فعلا ناموجود نمی باشد ☻</p>
                </div>
              )
          }

        </div >

      </section >

      <section className='container-box'>

        <div>
          <h3 className='products-title title-pr'>بیش ترین خریدار محصولات وبسایت </h3>
          <div>
            {allUsers.length &&
              (
                <>
                  <div className='parent-table table-users'>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">نام و نام خوانوادگی</th>
                          <th scope="col">نام کاربری</th>
                          <th scope="col">رمز عبور</th>
                          <th scope="col">شماره تماس</th>
                          <th scope="col">ایمیل</th>
                          <th scope="col">خرید</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>{userMaxBuy.firsname}-{userMaxBuy.lastname}</td>
                          <td>{userMaxBuy.username}</td>
                          <td>{userMaxBuy.password}</td>
                          <td>{userMaxBuy.phone}</td>
                          <td>{userMaxBuy.email}</td>
                          <td>{userMaxBuy.buy}</td>
                        </tr>
                      </tbody>

                    </table>
                  </div>
                </>
              )
            }
          </div>
        </div>

        <div>
          {allUsers.length ?
            (
              <>
                <h1 className='products-title'>آخرین کاربران ثبت نامی</h1>
                <div className='parent-table table-users'>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">نام و نام خوانوادگی</th>
                        <th scope="col">نام کاربری</th>
                        <th scope="col">رمز عبور</th>
                        <th scope="col">شماره تماس</th>
                        <th scope="col">ایمیل</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        allUsers.slice(allUsers.length - 3, allUsers.length).map(user => (
                          <tr key={user.id}>
                            <td>{user.firsname}-{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </>
            )
            :
            (<ErrorBoxEmpty msg={'هیچ کاربری یافت نشد'} />)
          }
        </div>

      </section>

    </div >
  )
}
