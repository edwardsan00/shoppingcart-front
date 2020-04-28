import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  containerMain: {
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    padding: '20px 0',
  }
})

const Main = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.containerMain}>
      {children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired
}

export default Main