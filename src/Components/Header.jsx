import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/Images/logo.png';
import { HiHome, HiMagnifyingGlass, HiPlayCircle, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import HeaderItem from './HeaderItem';

function Header() {
    const [toggle, setToggle] = useState(false);
    const menu = [
        {
            name: 'HOME',
            icon: HiHome,
            url: '/'
        },
        {
            name: 'SEARCH',
            icon: HiMagnifyingGlass,
            url: '/search'
        },
        {
            name: 'WATCH LIST',
            icon: HiPlus,
            url: '/watchlist'
        },
        {
            name: 'MOVIES',
            icon: HiPlayCircle,
            url: '/movies'
        },
        {
            name: 'SERIES',
            icon: HiTv,
            url: '/series'
        },
    
        {
            name:'CART',
            icon: FaShoppingCart,
            url: '/cart'
        },
    ];

    return (
        <div className='flex items-center justify-between p-1 bg-slate-800 '>
            <div className='flex gap-20 items-center'>
                <img src={logo} className='w-[80px] md:w-[115px] object-cover rounded-full' alt="Logo" />
                <div className='hidden md:flex gap-20'>
                    {menu.map((item, index) => (
                        <Link to={item.url} key={index}>
                            <HeaderItem name={item.name} Icon={item.icon} />
                        </Link>
                    ))}
                </div>
                <div className='flex md:hidden gap-5'>
                    {menu.slice(0, 3).map((item, index) => (
                        <Link to={item.url} key={index}>
                            <HeaderItem name={''} Icon={item.icon} />
                        </Link>
                    ))}
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical} />
                        {toggle &&
                            <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-8 py-4'>
                                {menu.slice(3).map((item, index) => (
                                    <Link to={item.url} key={index}>
                                        <HeaderItem name={item.name} Icon={item.icon} />
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
