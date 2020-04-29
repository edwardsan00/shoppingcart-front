import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'


import SearchAndResult from '../../../../components/Home/SearchAndResult'
import ResumenCart from '../../../../components/Home/ResumenCart'
import { GET_CUSTOMER_BY_ID } from '../../../../schemas/query/Common'


const useStyles = createUseStyles({
  containerHome: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  homeLeft: {
    width: '90%',
    margin: '0 auto'
  },
  homeRight:{
    width: '90%',
    margin: '0 auto',
    paddingTop: '10px'
  },
  '@media screen and (min-width: 1024px)': {
    containerHome: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    homeLeft: {
      width: '45%',
    },
    homeRight: {
      width: '45%',
      paddingTop: '58px'
    }
  }
})

const Home = () => {
  const classes = useStyles()
  const [ paramsResumenCart, setParamsResumenCart ] = useState({
    shippingCost: 0,
    summary: 0,
    taxes: 0,
    total:0
  }) 
  const customerId = localStorage.getItem('customerId')
  const { loading, data: { getCustumerById = {} } = {} } = useQuery(GET_CUSTOMER_BY_ID, { variables: { id: customerId } })
  const { productsInCart = [] } = getCustumerById
  console.log("===> Edward <===: Home -> getCustumerById", getCustumerById)
  console.log("===> Edward <===: Home -> productsInCart", productsInCart)

  useEffect(() => {
    if (!loading && productsInCart.length){
      const TAX = 18
      const SHIPPING = 10
      const total =  productsInCart.map(({ total }) => total).reduce((acc, curr) => acc.total + curr.total)
      console.log("===> Edward <===: Home -> totsdaawdal", total)
      if(total){
        const taxes = total * TAX / 100
        const shippingCost = total * SHIPPING / 100
        const summary = total - taxes - shippingCost
        setParamsResumenCart({
          shippingCost,
          summary,
          taxes,
          total
        })
      }
    }
  }, [loading, productsInCart])

  return (
    <div className={classes.containerHome}>
      <div className={classes.homeLeft}>
        <SearchAndResult productsInCart={productsInCart} />
      </div>
      <div className={classes.homeRight}>
        <ResumenCart {...paramsResumenCart}  />
      </div>
    </div>
  )
}

export default Home