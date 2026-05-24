import React from 'react'
import "./home.css"
import NewArrival from '../Components/NewArrival/NewArrival'
import HeroBanner from '../Components/HeroBanner/HeroBanner'
import TopSelling from '../Components/TopSelling/TopSelling'
import BrowseStyle from '../Components/BrowseStyle/BrowseStyle'
import Review from '../Components/Review/Review'

const Home = () => {
  return (
    <>
    <HeroBanner/>
    <NewArrival/>
    <TopSelling/>
    <BrowseStyle/>
    <Review/>
    </>
  )
}

export default Home

