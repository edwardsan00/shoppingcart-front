import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import SuccessLogo from '../../../../components/Resources/images/success.png'
const useStyles = createUseStyles({
  containerThanks: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 0'
  },
  thanksYou: {
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '42px',
    textAlign: 'center',
    color: '#333333'
  },
  orderNumber: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    marginTop: '15px'
  },
  continue: {
    color: '#0500FF',
    marginTop: '15px',
    textAlign: 'center',
    display: 'block',
    fontSize: '16px',
    lineHeight: '24px',
  },
  containerImage: {
    width: '100%',
    height: '100%',
    maxWidth: '350px',
    maxHeight: '350px',
    margin: '0 auto',
    marginTop: '20px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'container',
    objectPosition: 'center'
  }
})

const Thanks = () => {
  const classes = useStyles()
  return (
    <div className={classes.containerThanks}>
      <p className={classes.thanksYou}>Thank you</p>
      <p className={classes.orderNumber}>Your order <strong>P0001</strong> has been registered</p>
      <Link className={classes.continue} to='/'>Continue shopping</Link>
      <div className={classes.containerImage}>
        <img className={classes.image} alt='Success' src={SuccessLogo} />
      </div>
    </div>
  )
}

export default Thanks