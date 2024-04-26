import React, { useState, useEffect, useContext } from 'react'
import './Products.css'
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'
import { getProductNotExist, getProductsMaxBuy } from '../../Contexts/InfosHomePage'

export default function Products() {

  const [productsNotExist, setProductsNotExist] = useContext(getProductNotExist)
  const [productsMaxBuyProduct, setProductsMaxBuyProduct] = useContext(getProductsMaxBuy)
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

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
    <section>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </section>
  )
}
