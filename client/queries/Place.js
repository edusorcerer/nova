import gql from 'graphql-tag'

const ALL_PLACES_QUERY = gql`
  query {
    allPlaces {
      id
      name
      address {
        city
        state
        neighborhood
        street
        number
        geoCoordinates {
          lat
          longi
        }
      }
    }
  }
`

const DELETE_PLACE_MUTATION = gql`
  mutation deletePlace($id: ID!) {
    deletePlace(id: $id) {
      id
    }
  }
`

const CREATE_PLACE_MUTATION = gql`
  mutation createPlaceMutation(
    $name: String!
    $city: String!
    $state: String!
    $neighborhood: String
    $street: String
    $number: String
    $lat: String!
    $longi: String!
  ) {
    createPlace(
      name: $name
      address: {
        city: $city
        state: $state
        neighborhood: $neighborhood
        street: $street
        number: $number
        geoCoordinates: { lat: $lat, longi: $longi }
      }
    ) {
      name
    }
  }
`

export { ALL_PLACES_QUERY, CREATE_PLACE_MUTATION, DELETE_PLACE_MUTATION }
