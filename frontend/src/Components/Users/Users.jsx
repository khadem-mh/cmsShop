import React, { useEffect, useState } from 'react'
import './Users.css'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import EditMoal from '../Modals/EditMoal/EditMoal'
import InputEditModal from '../InputEditModal/InputEditModal'
import DetailsModal from '../Modals/DetailsModal/DetailsModal'
import { SiNamecheap } from "react-icons/si";
import { SlBasketLoaded } from "react-icons/sl";
import { FaUser, FaCity } from "react-icons/fa";
import { PiPasswordDuotone, PiAddressBookLight } from "react-icons/pi";
import { MdOutlinePhoneIphone, MdAlternateEmail, MdOutlineScoreboard } from "react-icons/md";


export default function Users({allUsers, getAllUsers}) {

  const [userId, setUserId] = useState(null)
  const [isShowDeleteUser, setIsShowDeleteUser] = useState(false)
  const [isShowDetailsUser, setIsShowDetailsUser] = useState(false)
  const [detailsBody, setDetailsBody] = useState({})
  //update state
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [userNewFirsname, setUserNewFirsname] = useState("");
  const [userNewLastname, setUserNewLastname] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");
  const [userNewScore, setUserNewScore] = useState("");


  const updateUser = (event) => {
    event.preventDefault();

    const userNewInfos = {
      firsname: userNewFirsname,
      lastname: userNewLastname,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllUsers()
      });
  };

  const submitDeleteUser = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setIsShowDeleteUser(false)
          getAllUsers()
        }
      })
  }

  const setDelete = (remove) => {
    remove(false)
  }

  return (
    <>
      <div>
        {allUsers.length ?
          (
            <>
              <h1 className='products-title'>کاربران</h1>
              <div className='parent-table table-users'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">نام و نام خوانوادگی</th>
                      <th scope="col">نام کاربری</th>
                      <th scope="col">رمز عبور</th>
                      <th scope="col">شماره تماس</th>
                      <th scope="col">ایمیل</th>
                      <th scope="col">کنترل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      allUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.firsname}-{user.lastname}</td>
                          <td>{user.username}</td>
                          <td>{user.password}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDeleteUser(true)
                              setUserId(user.id)
                            }}>حذف</button>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDetailsUser(true)
                              setUserId(user.id)
                              setDetailsBody(user)
                            }}>جزئیات</button>
                            <button className='products-table-btn'
                              onClick={() => {
                                setIsShowEditModal(true);
                                setUserId(user.id);
                                setUserNewFirsname(user.firsname);
                                setUserNewLastname(user.lastname);
                                setUserNewUsername(user.username);
                                setUserNewPassword(user.password);
                                setUserNewPhone(user.phone);
                                setUserNewCity(user.city);
                                setUserNewEmail(user.email);
                                setUserNewAddress(user.address);
                                setUserNewScore(user.score);
                                setUserNewBuy(user.buy);
                              }}
                            >
                              ویرایش
                            </button>
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
          (<ErrorBoxEmpty msg={'هیچ کاربری یافت نشد'} />)
        }
      </div>

      {isShowDeleteUser && (
        <DeleteModal cancleAction={() => setDelete(setIsShowDeleteUser)} submitAction={submitDeleteUser} title={'آیا از حذف کاربر اطمینان دارید'} />
      )}

      {isShowDetailsUser && (
          <DetailsModal onHide={() => setIsShowDetailsUser(false)} tHead={['شهر', 'آدرس', 'نمره', 'خرید']} tdIntoTbody={[detailsBody.city, detailsBody.address, detailsBody.score, detailsBody.buy]}/>
      )}

      {isShowEditModal &&
        <EditMoal onClose={() => setIsShowEditModal(false)} onSubmit={updateUser} title={'اطلاعات جدید را وارد نمایید'}>

          <InputEditModal setValInp={setUserNewFirsname} valInp={userNewFirsname} cildren={<SiNamecheap />} placeHolderInp={'نام'} />
          <InputEditModal setValInp={setUserNewLastname} valInp={userNewLastname} cildren={<SiNamecheap />} placeHolderInp={'نام خوانوادگی'} />
          <InputEditModal setValInp={setUserNewUsername} valInp={userNewUsername} cildren={<FaUser />} placeHolderInp={'نام کاربری'} />
          <InputEditModal setValInp={setUserNewPassword} valInp={userNewPassword} cildren={<PiPasswordDuotone />} placeHolderInp={'رمز عبور'} />
          <InputEditModal setValInp={setUserNewPhone} valInp={userNewPhone} cildren={<MdOutlinePhoneIphone />} placeHolderInp={'شماره تماس'} />
          <InputEditModal setValInp={setUserNewCity} valInp={userNewCity} cildren={<FaCity />} placeHolderInp={'شهر'} />
          <InputEditModal setValInp={setUserNewEmail} valInp={userNewEmail} cildren={<MdAlternateEmail />} placeHolderInp={'ایمیل'} />
          <InputEditModal setValInp={setUserNewAddress} valInp={userNewAddress} cildren={<PiAddressBookLight />} placeHolderInp={'آدرس محل اقامت'} />
          <InputEditModal setValInp={setUserNewScore} valInp={userNewBuy} cildren={<MdOutlineScoreboard />} placeHolderInp={'نمره'} />
          <InputEditModal setValInp={setUserNewBuy} valInp={userNewScore} cildren={<SlBasketLoaded />} placeHolderInp={'خرید'} />


        </EditMoal>
      }

    </>
  )
}
