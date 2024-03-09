import React from 'react'
//import logo from './../assets/Images/logo.jpg'
import { HiTv,HiHome,HiMagnifyingGlass,HiPlayCircle } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
function Header() {
  const menu=[
    {
      name:'HOME',
      icon:'HiHome'
    },
    {
      name:'SEARCH',
      icon:'HiMagnifyingGlass'
    },
    {
      name:'WATCH LIST',
      icon:'HiPlus'
    },
    {
      name:'MOVIES',
      icon:'HiPlayCircle'
    },
    {
      name:'SERIES',
      icon:'HiTv'
    },
    {
      name:'CART',
      icon:'FaShoppingCart'
    },
  ]
  return (
   
    <div>
      {/* <img src={logo} className='w-[80px] md:w-[115px] object-cover'/> */}
      
    </div>
   
  )
}

export default Header