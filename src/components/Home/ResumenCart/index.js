import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { Delivery } from '../../Resources/Icons'
import clsx from 'clsx'

const useStyles = createUseStyles({
  delivery: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  textDelivery: {
    marginLeft: '10px',
    color: '#333333',
    lineHeight: '24px',
    fontSize: '16px'
  },
  containerResumen: {
    backgroundColor: 'white',
    width: '100%',
    height: '200px',
    borderRadius: '4px',
    padding: '15px'
  },
  btnCompleteOrder: {
    textTransform: 'uppercase',
    width: '100%',
    border: 'solid 1px #DDDDDD',
    color: '#C1C1C1',
    marginTop: '10px',
    height: '48px',
    borderRadius: '4px',
    backgroundColor: '#F7F7F7',
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: '14px',
    cursor: 'pointer',
    '&.actived': {
      backgroundColor: '#FF8000',
      color: 'white'
    }
  },
  columResumen: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    '&.yellow': {
      backgroundColor: '#FFE200'
    },
    '&.total':{
      marginTop: '10px'
    }
  },
  textResumen: {
    color: '#333333',
    lineHeight: '24px',
    '&.bold': {
      fontWeight: 600
    }, 
    '&.red': {
      color: '#FF2D55'
    }
  }
})

const ResumenCart = ({ summary, shippingCost, taxes, total }) => {
  const shippingDay = '05/02/2020'
  const classes = useStyles()
  const history = useHistory()
 return (
   <div>
     <div className={classes.delivery}>
       <Delivery />
       <p className={classes.textDelivery}>
         Buy now and get it by <strong>{shippingDay}</strong>
       </p>
     </div>
     <div className={classes.containerResumen}>
       <div className={classes.columResumen}>
        <p className={classes.textResumen}>Products</p>
         <p className={classes.textResumen}>$ {Number(summary).toFixed(2)}</p>
       </div>
       <div className={clsx([classes.columResumen], 'yellow')}>
         <p className={clsx([classes.textResumen], 'bold')}>Shipping Cost</p>
         <p className={clsx([classes.textResumen], 'bold')}>$ {Number(shippingCost).toFixed(2)}</p>
       </div>
       <div className={classes.columResumen}>
         <p className={classes.textResumen}>Taxes</p>
         <p className={classes.textResumen}>$ {Number(taxes).toFixed(2)}</p>
       </div>
       <div className={clsx([classes.columResumen], 'total')}>
         <p className={clsx([classes.textResumen], 'bold')}>Total</p>
         <p className={clsx([classes.textResumen], 'bold', 'red')}>$ {Number(total).toFixed(2)}</p>
       </div>  
     </div>
     <button onClick={() => history.push('/thanks')} disabled={Number(total) < 50} className={clsx([classes.btnCompleteOrder], Number(total) > 50 && 'actived')}>
      Complete order
     </button>
   </div>
 )
}

ResumenCart.propTypes = {
  summary: PropTypes.number.isRequired,
  shippingCost: PropTypes.number.isRequired,
  taxes: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default ResumenCart