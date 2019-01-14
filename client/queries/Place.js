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
  mutation createPlaceMutation($name: String!) {
    createPlace(
      name: $name
      address: {
        addressType: "residential"
        city: "Fjarðabyggð"
        complement: ""
        country: "Iceland"
        neighborhood: "Fáskrúðsfjörður"
        number: "10"
        postalCode: ""
        state: "Austurland"
        street: ""
        geoCoordinates: { lat: "64.928923", longi: "-14.006109" }
      }
    ) {
      name
    }
  }
`

export { ALL_PLACES_QUERY, CREATE_PLACE_MUTATION, DELETE_PLACE_MUTATION }
