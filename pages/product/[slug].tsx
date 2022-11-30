/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { urlFor, client } from '../../lib/client'
import { ProductInterface } from '../../interface'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'
const ProductDetails = ({ product, products }: any) => {
  const { image, name, details, price } = product
  const [index, setIndex] = useState(0)
  const { decQty, incQty, qty, onAdd, setShowCart, setQty }: any = useStateContext()
  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} alt="" className='product-detail-image' />
          </div>
          <div className="small-images-container">
            {image?.map((item: any, k: number) => (
              <img src={urlFor(item)} alt={item._key} key={item._key} className={k === index ? 'small-image selected-imagge' : 'small-image'} onMouseEnter={() => setIndex(k)} />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">
            ${price}
          </p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className='quantity-desc'>
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item: ProductInterface) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`
  const products = await client.fetch(query)
  const paths = products.map((product: ProductInterface) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}
export const getStaticProps = async ({ params: { slug } }: any) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { product, products }
  }
}
export default ProductDetails