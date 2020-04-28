import React from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { EmptyBag } from '../../Resources/Icons'
import ItemCart from '../ItemCart'

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

const SearchAndResult = () => {
  const classes = useStyle()
  const products = [{
    name: 'Samsung a50',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41FaKE61LWL._AC_.jpg',
    id: 2,
    price: 200,
    quantity: 5
  }]
  const _handleInputChange = (e) => {
    const { value } = e.target
    console.log(value)
  }

  return (
    <div>
      <input className={classes.inputSearch} onChange={_handleInputChange} />
      <div className={clsx([classes.boxSearch], !products.length && 'empty')}>
        { products.length ? (
          products.map(({ id, image, name, price, quantity }) => {
            return <ItemCart key={id} image={image} name={name} price={price} quantity={quantity} />
          })
        ): (
          <>
            <EmptyBag />
            <p className={classes.titleBag}>Your carts is empty</p>
            <p className={classes.descriptionBag}>Seems like you haven’t chosen what to buy...</p>
          </>
        )}
      </div>
    </div>
  )
}


export default SearchAndResult