import React from 'react'
import { createUseStyles } from 'react-jss'

import SearchAndResult from '../../../../components/Home/SearchAndResult'
import ResumenCart from '../../../../components/Home/ResumenCart'

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
  return (
    <div className={classes.containerHome}>
      <div className={classes.homeLeft}>
        <SearchAndResult />
      </div>
      <div className={classes.homeRight}>
        <ResumenCart shippingCost={200} summary={120} taxes={14} total={200} shippingDay={'05/02/2020'} />
      </div>
    </div>
  )
}

export default Home