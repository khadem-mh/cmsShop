import React, { useState, useEffect } from 'react'
import './Comments.css'
import DetailsModal from '../../Components/Modals/DetailsModal/DetailsModal'
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import EditMoal from '../../Components/Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'

export default function Comments() {

  const [allComments, setAllComments] = useState([])
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowReplyModal, setIsShowReplyModal] = useState(false)
  const [isShowEditReplyModal, setIsShowEditReplyModal] = useState(false)
  const [mainCommentBody, setMainCommentBody] = useState('')
  const [getID, setGetID] = useState('')

  useEffect(() => {
    getAllComments()
  }, [])

  const getAllComments = () => {
    fetch('http://localhost:8000/api/comments')
      .then(res => res.json())
      .then(comments => setAllComments(comments))
  }

  const AcceptComment = event => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/accept/${getID}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
      })
    setIsShowAcceptModal(false)
  }

  const RejecctComment = event => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/reject/${getID}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => {
        getAllComments()
      })
    setIsShowRejectModal(false)
  }

  const updateComment = event => {
    event.preventDefault()
    console.log('update');
    fetch(`http://localhost:8000/api/comments/${getID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        getAllComments()
        console.log(result);
        setIsShowEditModal(false)
      })
  }

  const replyComment = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/comments/reply/${getID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
      })
    setIsShowReplyModal(false)
    setMainCommentBody('')
  }

  const editReplyComment = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/reply/${getID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        getAllComments()
      })
    setIsShowEditReplyModal(false)
  }

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${getID}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(comments => {
        getAllComments()
        setIsShowDeleteModal(false)
      })
  }

  const closeModal = setClose => {
    setClose(false)
  }


  return (
    <div>
      {
        allComments.length ?
          (
            <>
              <h1 className='products-title'>کامنت ها</h1>
              <div className='parent-table'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">اسم کاربر</th>
                      <th scope="col">محصول</th>
                      <th scope="col">مشاهده کامنت</th>
                      <th scope="col">تاریخ</th>
                      <th scope="col">ساعت</th>
                      <th scope="col">کنترل</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      allComments.map(comment => (
                        <tr key={comment.id}>
                          <td>{comment.userID}</td>
                          <td>{comment.productID}</td>
                          <td><button onClick={() => {
                            setIsShowDetailsModal(true)
                            setMainCommentBody(comment.body)
                          }} className='products-table-btn'>دیدن متن</button></td>
                          <td>{comment.date}</td>
                          <td>{comment.hour}</td>
                          <td>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowDeleteModal(true)
                              setGetID(comment.id)
                            }}>حذف</button>
                            <button className='products-table-btn' onClick={() => {
                              setIsShowEditModal(true)
                              setGetID(comment.id)
                              setMainCommentBody(comment.body)
                            }}>ویرایش</button>
                            {
                              comment.reply.length > 1 ? <button className='products-table-btn' onClick={() => {
                                setMainCommentBody(comment.reply)
                                setIsShowEditReplyModal(true)
                                setGetID(comment.id)
                              }}>ویرایش پاسخ</button> : (
                                <button className='products-table-btn' onClick={() => {
                                  setIsShowReplyModal(true)
                                  setMainCommentBody('')
                                  setGetID(comment.id)
                                }}>پاسخ</button>
                              )
                            }
                            {
                              comment.isAccept === 1 ? (
                                <>
                                  <button className='products-table-btn' onClick={() => {
                                    setIsShowRejectModal(true)
                                    setGetID(comment.id)
                                  }}>رد کامنت</button>
                                </>
                              ) : (
                                <button className='products-table-btn' onClick={
                                  () => {
                                    setIsShowAcceptModal(true)
                                    setGetID(comment.id)
                                  }}>تایید</button>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>

                </table>
              </div>
            </>
          )
          : <ErrorBoxEmpty msg={'هیچ کامنتی یافت نشد'} />
      }

      {
        isShowDetailsModal &&
        <DetailsModal onHide={() => closeModal(setIsShowDetailsModal)} tdIntoTbody={[mainCommentBody]}/>
      }

      {
        isShowEditModal &&
        <EditMoal onClose={() => closeModal(setIsShowEditModal)} onSubmit={updateComment} title={'اطلاعات جدید را وارد نمایید'}>
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}></textarea>
        </EditMoal>
      }

      {
        isShowDeleteModal && <DeleteModal cancleAction={() => setIsShowDeleteModal(false)} submitAction={deleteComment} title={'آیا از حذف کامنت اطمینان دارید'} />
      }

      {
        isShowAcceptModal && <DeleteModal cancleAction={() => closeModal(setIsShowAcceptModal)} submitAction={AcceptComment} title={'آیا از تایید کامنت اطمینان دارید'} />
      }

      {
        isShowRejectModal && <DeleteModal cancleAction={() => closeModal(setIsShowRejectModal)} submitAction={RejecctComment} title={'آیا از رد کامنت اطمینان دارید'} />
      }

      {
        isShowReplyModal &&
        <EditMoal onClose={() => closeModal(setIsShowReplyModal)} onSubmit={replyComment} title={'پاسخ مورد نظر خود را وارد نمایید'}>
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}></textarea>
        </EditMoal>
      }

      {
        isShowEditReplyModal &&
        <EditMoal onClose={() => closeModal(setIsShowEditReplyModal)} onSubmit={editReplyComment} title={'پاسخ خود را ویرایش نمایید'}>
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}></textarea>
        </EditMoal>
      }

    </div >
  )
}
