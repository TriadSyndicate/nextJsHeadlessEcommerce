import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import {FaAssistiveListeningSystems} from 'react-icons/fa'
const Navbar = () => {
    const { showCart, setShowCart, totalQuantities }: any = useStateContext()
    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link href="/">
                    Triad&apos;s Sounds <FaAssistiveListeningSystems/>
                </Link>
            </p>
            <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">
                    {totalQuantities}
                </span>
            </button>
           { showCart && <Cart />}
        </div>
    )
}

export default Navbar