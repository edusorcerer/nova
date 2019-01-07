import React, { Component } from "react"
import { View, Text } from "react-native"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Button, FormLabel, FormInput } from "react-native-elements"

class CreatePlace extends Component {
  state = {
    name: "",
    address: {}
  }

  /**
   * @TODO: handler for address change.
   * It might be a call for the Google Maps API, that searches for user's address
   */
  handleAddressChange = e => console.log(e)

  render() {
    const { handleAddressChange, props, state } = this
    const { allPlacesQuery } = props
    const { name } = state

    return (
      <View>
        <Text>create a place</Text>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={name => this.setState({ name })} />

        <FormLabel>Address</FormLabel>
        <FormInput onChangeText={e => handleAddressChange(e)} />

        <Mutation mutation={CREATE_PLACE} onCompleted={allPlacesQuery.refetch}>
          {(createPlaceMutation, { data }) => (
            <Button
              onPress={createPlaceMutation ? () => createPlaceMutation({ variables: { name } }) : () => true}
              title="create place"
            />
          )}
        </Mutation>
      </View>
    )
  }
}

const CREATE_PLACE = gql`
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

export default CreatePlace
