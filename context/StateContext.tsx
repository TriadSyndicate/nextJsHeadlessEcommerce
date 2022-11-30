import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { ProductInterface } from '../interface'

const Context = createContext({})

export const StateContext = ({ children }: any) => {
    const [showCart, setShowCart]: any = useState(false)
    const [cartItems, setCartItems]: any = useState([])
    const [totalPrice, setTotalPrice]: any = useState(0)
    const [totalQuantities, setTotalQuantities]: any = useState(0)
    const [qty, setQty] = useState(1)
    let foundProduct: any;
    let index: any;
    const onAdd = (product: any, quantity: any) => {
        const checkProductInCart = cartItems.find((item: ProductInterface) => item._id === product._id)
        setTotalPrice((prevTotalPrice: number) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities + quantity)
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct: any) => {
                if (cartProduct._id === product._id) return { ...cartProduct, quantity: cartProduct.quantity + quantity }
            })
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
    const onRemove = (product: ProductInterface) => {
        foundProduct = cartItems.find((item: ProductInterface) => item._id === product._id);

        const newCartItems = cartItems.filter((item: ProductInterface) => item._id !== product._id);
        setTotalPrice((prevTotalPrice: number) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }
    const toggleCartItemQuantity = (id: unknown, value: unknown) => {
        foundProduct = cartItems.find((item: any) => item._id === id)
        index = cartItems.findIndex((product: any) => product._id === id)
        let newCartItems = cartItems.filter((item: { _id: unknown }) => item._id !== id)

        if (value === 'inc') {
            newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1 })
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice: any) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1 })
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice: number) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities - 1)
            }
        }
    }
    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider value={
            {
                showCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, toggleCartItemQuantity,
                setShowCart, onRemove, setCartItems, setTotalPrice, setTotalQuantities, setQty
            }
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)