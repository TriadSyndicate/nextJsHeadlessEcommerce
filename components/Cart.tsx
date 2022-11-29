/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
import { ProductInterface } from '../interface'

const Cart = () => {
  const cartRef: any = useRef()
  const { totalPrice, onRemove, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity }: any = useStateContext()
  const handleCheckout = async () => {
    const stripe = await getStripe()
    const response: any = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItems:cartItems})
    })

    if (response.statusCode === 500) return;

    const data = await response.json()

    toast.loading('Redirecting ... ')
    console.log(`data : ${data}`)
    stripe?.redirectToCheckout({ sessionId: data.id })
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Bag is Empty</h3>
            <Link href="/">
              <button type='button' onClick={() => setShowCart(false)} className="btn">
                Contiinue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item: ProductInterface, index: number) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} alt={item.name} className="cart-product-image" />
              <div className='item-desc'>
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className='quantity-desc'>
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.quantity}
                      </span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* SubTotal For Cart */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn' onClick={handleCheckout}>
                Pay With Credit Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart