import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { BsBagCheckFill } from 'react-icons/bs'
import { GiHeartShield } from 'react-icons/gi'
import { useRouter } from 'next/router'
import { FaReceipt } from 'react-icons/fa'
import { useStateContext } from '../context/StateContext'

import { schoolPrideConfetti } from '../lib/utils'

const Succcess = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities }: any = useStateContext()
    const [order, setOrder] = useState(null)
    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        schoolPrideConfetti()
    }, [setCartItems, setTotalPrice, setTotalQuantities])
    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>
                    Thank You for your Order <GiHeartShield color='red' />
                </h2>
                <p className="email-msg">
                    Check your email inbox for the order receipt! <FaReceipt />
                </p>
                <p className="description">
                    If you have any questions, please email
                    <a href="mailto:tony@254gamers.com" className="email">
                        orders@triadsound.com
                    </a>
                </p>
                <Link href="/">
                    <button type='button' className='btn'> CONTINUE SHOPPING</button>
                </Link>
            </div>
        </div>
    )
}

export default Succcess