import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useDebounce } from '../../../utils/hooks'

import { EmptyBag } from '../../Resources/Icons'
import ItemCart from '../ItemCart'
import { GET_CUSTOMER_BY_ID } from '../../../schemas/query/Common'

const useStyle = createUseStyles({
  inputSearch: {
    width: '100%',
    height: '48px',
    border: '1px solid #DDDDDD',
    borderRadius: '4px',
    padding: '12px',
    fontSize: '1em',
    outline: 'none'
  },
  'input:focus': {
    outline: 'none'
  },
  boxSearch: {
    marginTop: 10,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 4,
    '&.empty': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },

  titleBag: {
    fontSize: 21,
    lineHeight: '32px',
    fontWeight: 600,
    margin: '10px 0'
  },
  descriptionBag: {
    textAlign: 'center',
    width: '60%',
    lineHeight: '24px'
  }
})

const GET_PRODUCTS = gql`
  query getProducts($search: String){
    getProducts(search: $search){
      id
      name
      description
      image
      price
      quantity
    }
  }
`

const ADD_CART = gql`
  mutation addCart($addCart: AddCartInput!){
    addCart(addCart: $addCart){
      id
      productId{
        id
        name
        description
        image
        price
        quantity
      } 
      quantity
      total
    }
  }
`

const GET_CARTS_BY_CUSTOMER_ID = gql`
  query getCartByCustomerId($id: String!){
    getCartByCustomerId(id: $id){
      id
      status
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!){
      deleteProduct(id: $id){
        success
      }
  }
`

const SearchAndResult = ({ productsInCart = [] }) => {
  const classes = useStyle()
  const customerId = localStorage.getItem('customerId')
  const [ searchProduct, setSearchProduct ] = useState('')
  const [ productsList, setProductsList] = useState([])
  const [addCart] = useMutation(ADD_CART)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const debounceSearch = useDebounce(searchProduct, 1000)

  const clearProductsInCart = productsInCart.map(({ productId: product = {}, quantity, total, id }) => {
    const { name, image, price, id: productId } = product
    return {
      id,
      quantity,
      total,
      name,
      image,
      price,
      productId
    }
  })

  const { data: { getCartByCustomerId } = {} } = useQuery(GET_CARTS_BY_CUSTOMER_ID, { variables: { id: customerId }, skip: !customerId })
  
  const { loading, data: { getProducts = [] } = {} } = useQuery(GET_PRODUCTS, { variables: { search: debounceSearch }  })

  useEffect(() => {
    if(!loading && !productsList.length && getProducts.length){
      const filterResult = getProducts.filter(({ id }) => !clearProductsInCart.some(({ productId }) => id === productId ))
      setProductsList(filterResult)
    }
    if((loading && productsList.length))
      setProductsList([])
      
  }, [clearProductsInCart, getProducts, loading, productsList.length])


  const _handleInputChange = (e) => {
    const { value } = e.target
    setSearchProduct(value)
  }

  const _handleAddItem = ({productId, quantity, total}) => {
    const { id: cartId } = getCartByCustomerId
    addCart({ variables: {
      addCart: {
        cartId,
        productId,
        total,
        quantity
      }
    }, update: (cache, { data: { addCart } }) => {
        const getCustomerById = cache.readQuery({ query: GET_CUSTOMER_BY_ID, variables: { id: customerId } })

        cache.writeQuery({ query: GET_CUSTOMER_BY_ID, data: { 
          getCustomerById: {
            ...getCustomerById,
            productsInCart: [...productsInCart, addCart]
          }
         }})
    }})
  }

  const _handleDeleteItem = (id) => {
    deleteProduct({ variables: { id }})
  }

  return (
    <div>
      <input className={classes.inputSearch} onChange={_handleInputChange} />
      <div className={clsx([classes.boxSearch], !productsList.length && !clearProductsInCart.length && 'empty')}>
        { searchProduct && productsList.length ? (
          productsList.map(({ id, image, name, price, quantity }) => {
            return <ItemCart onHandleAddItem={_handleAddItem} key={id} id={id} image={image} name={name} price={price} quantity={quantity} />
          })
        ): null}
        {clearProductsInCart.length ? (
          clearProductsInCart.map(({ id, image, name, price, quantity }) => {
            return <ItemCart id={id} onHandleDeleteItem={_handleDeleteItem} key={id} image={image} name={name} price={price} inCart={true} quantity={quantity} />
          })
        ): null}
        {
          (!clearProductsInCart.length && !productsList.length) ? (
            <>
              <EmptyBag />
              <p className={classes.titleBag}>Your carts is empty</p>
              <p className={classes.descriptionBag}>Seems like you haven’t chosen what to buy...</p>
            </>
          ) : null
        }
      </div>
    </div>
  )
}

SearchAndResult.propTypes = {
  productsInCart: PropTypes.array
}


export default SearchAndResult