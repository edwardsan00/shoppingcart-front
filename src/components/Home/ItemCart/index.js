import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  containerItem: {
    width: '100%',
    display: 'flex',
    height: '100px',
    borderBottom: 'solid 1px #DDDDDD',
    position: 'relative'
  },
  containerImage: {
    flex: '120px 0 0',
    padding: '15px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  },
  containerDescription: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    padding: '15px 0'
  },
  productName: {
    lineHeight: '24px',
    color: '#333333'
  },
  productPrice: {
    fontSize: '21px',
    lineHeight: '32px',
    color: '#FF2D55',
    fontWeight: 600
  },
  containerActions: {
    flex: '70px 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8000',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  btnQuantity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8000',
    height: '30px',
    width: '90px',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer'
  },
  quantity: {
    color: 'white',
    fontWeight: 600,
    fontSize: '14px',
    width: '30px',
    textAlign: 'center'
  },
  btnDelete: {
    marginTop: '10px',
    backgroundColor: 'white',
    border: 'solid 1px #DDDDDD',
    padding: '5px 8px',
    borderRadius: '4px',
    color: '#333',
    cursor: 'pointer',
    fontSize: '11px'
  },
  actionQuantity: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8000',
    color: 'white',
    width: '30px',
    height: '100%',
    border: 'none',
    fontWeight: 600,
    display: 'flex'
  }
})

const ItemCart = ({ name, price, image, inCart = false }) => {
  const classes = useStyles()
  return (
    <div className={classes.containerItem}>
      <div className={classes.containerImage}>
        <img className={classes.image} src={image} alt={name} />
      </div>
      <div className={classes.containerDescription}>
        <p className={classes.productName}>{name}</p>
        <p className={classes.productPrice}>$ {price}</p>
      </div>
      <div className={classes.containerActions}>
        <div className={clsx(inCart ? [classes.btnQuantity] : [classes.addItem] )}>
          {inCart ? (
            <>
            <button className={classes.actionQuantity}>+</button>
            <p className={classes.quantity}>1</p>
            <button className={classes.actionQuantity}>-</button>
            </>
          ): (
              <p className={classes.quantity}>+</p>
          )}
        </div>
        {inCart && (
          <button className={classes.btnDelete}>Eliminar</button>
        )}
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  inCart: PropTypes.bool
}

export default ItemCart