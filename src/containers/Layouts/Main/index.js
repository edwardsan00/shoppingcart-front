import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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

const CREATE_CUSTOMER = gql`
  mutation createCustomer($customer: CustomerInput!){
    createCustomer(customer: $customer){
      id
      firstName
    }
  }
`

const CREATE_CART = gql`
  mutation createCart($customerId: String!){
    createCart(customerId: $customerId){
      id
      customerId
      status
    }
  }
`


const Main = ({ children }) => {
  const customerId = localStorage.getItem('customerId')
  const [createCustomer, { data: dataCreate, loading: loadingCreate }] = useMutation(CREATE_CUSTOMER)
  const [createCart ] = useMutation(CREATE_CART)

  useEffect(() => {
    if (!customerId)
      createCustomer({ variables: { 
        customer: {
          firstName: 'Invitado',
          email: `usuarioInvitado${Math.floor((Math.random() * 1000) + 1000)}@gmail.com`
        }
      }})
  }, [createCustomer, customerId])

  // useEffect(() => {
  //   if(!customerId && )
  // }, [dataCreate])

  useEffect(() => {
    if (!!dataCreate && !loadingCreate){
      const { createCustomer: { id } = {} } = dataCreate || {}
      if(id){
        localStorage.setItem('customerId', id)
        createCart({ variables: {
          id
        }})
      }
    }
  }, [createCart, dataCreate, loadingCreate])
  



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