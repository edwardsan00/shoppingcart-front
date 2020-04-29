import { gql } from 'apollo-boost'

export const GET_CUSTOMER_BY_ID = gql`
  query getCustumerById($id: String!){
    getCustumerById(id: $id){
      customer{
        firstName
        email
      }
      productsInCart{
        quantity
        total
        id
        productId{
          name
          image
          id
          description
          price
          quantity
        }
      }
    }
  }
`