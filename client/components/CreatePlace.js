import React, { Component } from 'react'
import { View } from 'react-native'
import { Mutation } from 'react-apollo'
import { Button, FormLabel, FormInput } from 'react-native-elements'

import { CREATE_PLACE_MUTATION } from '../queries/Place'

class CreatePlace extends Component {
  state = {
    address: {},
    isLoading: false,
    name: '',
  }

  /**
   * @TODO: handler for address change.
   * It might be a call for the Google Maps API, that searches for user's address
   */
  handleAddressChange = e => console.log(e)

  handleCreatePlace = (createPlaceMutation, name) => {
    this.setState({
      isLoading: true,
    })
    return createPlaceMutation && createPlaceMutation({ variables: { name } })
  }

  render() {
    const { handleAddressChange, handleCreatePlace, props, state } = this
    const { allPlacesQuery } = props
    const { isLoading, name } = state

    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          autoFocus={true}
          onChangeText={name => this.setState({ name })}
        />

        <FormLabel>Address</FormLabel>
        <FormInput onChangeText={e => handleAddressChange(e)} />

        <Mutation
          mutation={CREATE_PLACE_MUTATION}
          onCompleted={allPlacesQuery.refetch}
        >
          {createPlaceMutation => (
            <Button
              loading={isLoading}
              loadingProps={{ size: 'large', color: '#009688' }}
              backgroundColor="#009688"
              onPress={() => handleCreatePlace(createPlaceMutation, name)}
              title="create place"
            />
          )}
        </Mutation>
      </View>
    )
  }
}

export default CreatePlace
