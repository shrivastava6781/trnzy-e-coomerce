import React from 'react'
import ProductDetails from '../Components/ProductDetails/ProductDetails'
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct'
import NewArrival from '../Components/NewArrival/NewArrival'
import TopSelling from '../Components/TopSelling/TopSelling'
import Review from '../Components/Review/Review'

const ProdcutDetailsPage = () => {
  return (
    <>
      <ProductDetails/>
      <TopSelling/>
      <Review/>
    </>
  )
}

export default ProdcutDetailsPage