import React, { useState, useEffect } from "react";
//Css
import './Css/App.css'
import './Css/medias.css'
import { useRoutes, Link, useLocation } from "react-router-dom";
//import context
import { BtnClickContext } from "./Contexts/BtnClickContext";
import { getOrdersTotalPrice, getProductNotExist, getProductsMaxBuy } from "./Contexts/InfosHomePage";
//Asset
import { Col } from 'react-bootstrap'
//Components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Side-bar/Sidebar";
import routes from "./routes";
//?Icons
import { SiNamecheap } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
//Modals
import EditMoal from './Components/Modals/EditMoal/EditMoal'
import DetailsModal from './Components/Modals/DetailsModal/DetailsModal'
import InputEditModal from './Components/InputEditModal/InputEditModal'
//Funcs Folder
import getAllOrders from "./Functions/getAllOrders";


const App = () => {

  const [productsMaxBuyProduct, setProductsMaxBuyProduct] = useState()

  const [allProducts, setAllProducts] = useState([])
  const [productsNotExist, setProductsNotExist] = useState([])

  const [getOrders, setGetOrders] = useState([])
  const [ordersTotalPrice, setOrdersTotalPrice] = useState(null)
  //
  let router = useRoutes(routes)
  const [btnEditAdmin, setBtnEditAdmin] = useState(false)
  const location = useLocation()
  const [isLightMode, setIsLightMode] = useState(false);
  const [isManager, setIsManagar] = useState(true);
  const [isShowDetailsError, setIsShowDetailsError] = useState(false)
  const [managerInfos, setManagerInfos] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [adminPass, setAdminPass] = useState('');

  useEffect(() => {
    if (localStorage.getItem('admin-infos')) {
      getAllAdmins()
    }

    if (JSON.parse(localStorage.getItem('light-mode')) === null) {
      localStorage.setItem('light-mode', JSON.stringify('false'))
    }

    else {
      if (JSON.parse(localStorage.getItem('light-mode')) === "true") {
        setIsLightMode(true)
        document.documentElement.classList.add('light-mode')
      } else {
        setIsLightMode(false)
        document.documentElement.classList.remove('light-mode')
      }
    }

    getAllOrders(setGetOrders, setOrdersTotalPrice)
    getAllProducts()
  }, [])

  useEffect(() => {
    if (location.pathname === routes[6].path) {
      if (btnEditAdmin) {
        let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))
        setManagerInfos(adminInfos)
      }
    }
  })

  const getAllAdmins = event => {
    event && event.preventDefault()
    let mainAdmin = JSON.parse(localStorage.getItem('admin-infos'))

    if (mainAdmin) {
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
            setManagerInfos(...admin)
            setIsManagar(false)
          }
          else setIsShowDetailsError(true)
        })
    }
    event && !mainAdmin &&
      fetch(`http://localhost:8000/api/admins`, {
        method: 'GET',
        headers: {
          'adminname': adminName,
          'adminpassword': adminPass,
        }
      })
        .then(res => res.json())
        .then(admin => {
          if (admin.length) {
            setManagerInfos(...admin)
            setIsManagar(false)
            localStorage.setItem('admin-infos', JSON.stringify(
              {
                id: admin[0].id,
                firstname: admin[0].firstname,
                lastname: admin[0].lastname,
                username: admin[0].username,
                password: admin[0].password,
                task: admin[0].task,
                img: admin[0].img,
              }
            ))
          }
          else setIsShowDetailsError(true)
        })
  }

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(products => {
        setAllProducts(products)
        let notExist = []
        let buy = []
        let buyes = products.map(product => {
          product.count === 0 && notExist.push(product)
          return { [product.id]: product.sale }
        })
        let productsFind = buyes.filter(productBuy => buy.push(productBuy[Object.keys(productBuy)]))
        let productIDMaxBuyFind = productsFind.find(product => {
          if (product[Object.keys(product)] === Math.max(...buy)) return product
          return false
        })
        let findIndexProduct = Object.keys(productIDMaxBuyFind)[0];
        let findProductArray = []
        products.map(product => product.id === +findIndexProduct && findProductArray.push(product))
        setProductsMaxBuyProduct(findProductArray[0])
        setProductsNotExist(notExist)
      })
  }

  return (
    <>

      {
        isManager === false &&
        (
          <>
            <Sidebar />
            <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}>
              <Col className="admin-profile">
                <Link to={'/admin'} ><img src={managerInfos.img} alt="Admin Profile" /></Link>
                <div>
                  <Link to={'/admin'} ><h1>{managerInfos.firstname} {managerInfos.lastname}</h1></Link>
                  <h3>{managerInfos.task}</h3>
                </div>
              </Col>
            </Header>
            <section className="App">
              <div className="content-middle-cms">
                <BtnClickContext.Provider value={[btnEditAdmin, setBtnEditAdmin]}>
                  <getOrdersTotalPrice.Provider value={[ordersTotalPrice, setOrdersTotalPrice]}>
                    <getProductNotExist.Provider value={[productsNotExist, setProductsNotExist]}>
                      <getProductsMaxBuy.Provider value={[productsMaxBuyProduct, setProductsMaxBuyProduct]}>
                        {router}
                      </getProductsMaxBuy.Provider>
                    </getProductNotExist.Provider>
                  </getOrdersTotalPrice.Provider>
                </BtnClickContext.Provider>
              </div>
            </section>
          </>
        )
      }

      {
        isManager && (
          <EditMoal title={'نام کاربری و رمزعبور خود را وارد نمایید'} onSubmit={getAllAdmins} onClose={() => false} >
            <InputEditModal setValInp={setAdminName} valInp={adminName} cildren={<SiNamecheap />} placeHolderInp={"نام کاربری خود"} />
            <InputEditModal setValInp={setAdminPass} valInp={adminPass} cildren={<RiLockPasswordLine />} placeHolderInp={"رمز عبور خود"} />
          </EditMoal>
        )
      }

      {
        isShowDetailsError && (
          <DetailsModal onHide={() => setIsShowDetailsError(false)} tdIntoTbody={['خطا : اطلاعات وارد شده صحیح نمی باشد یا اطلاعات فضای محلی اشتباه است']} />
        )
      }

    </>
  );
}

export default App;