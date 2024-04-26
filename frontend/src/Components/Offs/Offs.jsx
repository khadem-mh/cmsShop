import React, { useState } from 'react'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'

export default function Offs({ getOffs, getAllOffs }) {

  const [isShowDeleteOffs, setIsShowDeleteOffs] = useState(false)
  const [isShowActiveOffs, setIsShowActiveOffs] = useState(false)
  const [isActive, setIsActive] = useState(0)
  const [offID, setOffID] = useState(null)

  const submitDeleteOffs = () => {
    fetch(`http://localhost:8000/api/offs/${offID}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setIsShowDeleteOffs(false)
          getAllOffs()
        }
      })
  }

  const offIsActive = () => {

    fetch(`http://localhost:8000/api/offs/active-off/${offID}/${isActive}`, {
      method: 'PUT'
    })
      .then(res => {
        if (res.ok) getAllOffs()
      })
    setIsShowActiveOffs()
  }

  return (
    <>
      {
        getOffs.length ?
          (
            <>

              <h1 className='products-title'>تخفیف ها</h1>
              <div className='parent-table table-users'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">کد تخفیف</th>
                      <th scope="col">درصد تخفیف</th>
                      <th scope="col">نام admin</th>
                      <th scope="col">محصول</th>
                      <th scope="col">تنظیم شده در تاریخ</th>
                      <th scope="col">فعال</th>
                      <th scope="col">کنترل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getOffs.map(off => (
                      <tr key={off.id}>
                        <td>{off.code}</td>
                        <td>{off.percent} %</td>
                        <td>{off.adminID}</td>
                        <td>{off.productID}</td>
                        <td>{off.date}</td>
                        <td>{off.isActive === 0 ? 'خیر' : 'بله'}</td>
                        <td>
                          <button className='products-table-btn' onClick={() => {
                            setOffID(off.id)
                            setIsShowDeleteOffs(true)
                          }}>حذف</button>
                          {
                            off.isActive === 0 ?
                              (
                                <button className='products-table-btn' onClick={() => {
                                  setOffID(off.id)
                                  setIsActive(1)
                                  setIsShowActiveOffs(true)
                                }}>فعال کردن</button>
                              )
                              :
                              (
                                <button className='products-table-btn' onClick={() => {
                                  setOffID(off.id)
                                  setIsActive(0)
                                  setIsShowActiveOffs(true)
                                }}>غیر فعال کردن</button>
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
          (<ErrorBoxEmpty msg={'هیچ تخفیفی یافت نشد'} />)
      }


      {isShowDeleteOffs && (
        <DeleteModal cancleAction={() => setIsShowDeleteOffs(false)} submitAction={submitDeleteOffs} title={'آیا از حذف کد تخفیف اطمینان دارید'} />
      )}

      {isShowActiveOffs && (
        <DeleteModal cancleAction={() => setIsShowActiveOffs(false)} submitAction={offIsActive} title={'آیا از فعال یا غیر فعال کردن کد تخفیف اطمینان دارید'} />
      )}

    </>
  )
}
