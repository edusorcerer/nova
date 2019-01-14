import React, { Component } from 'react'
import { View } from 'react-native'
import { Mutation } from 'react-apollo'
import { Button, FormLabel, FormInput } from 'react-native-elements'

import AddressSearchInput from './AddressSearchInput'

import { CREATE_PLACE_MUTATION } from '../queries/Place'

class CreatePlace extends Component {
  state = {
    address: null,
    isLoading: false,
    name: '',
  }

  handleAddressChange = (data, place) => {
    const { getParsedAddress } = this.props
    const address = getParsedAddress(place)

    this.setState({ address })
  }

  handleCreatePlace = createPlaceMutation => {
    const { address, name } = this.state
    const { geoCoordinates } = address

    this.setState({
      isLoading: true,
    })

    return (
      createPlaceMutation &&
      createPlaceMutation({
        variables: {
          name,
          ...address,
          lat: toString(geoCoordinates.lat),
          longi: toString(geoCoordinates.longi),
        },
      })
    )
  }

  render() {
    const { handleAddressChange, handleCreatePlace, props, state } = this
    const { allPlacesQuery } = props
    const { address, isLoading, name } = state

    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          autoFocus={true}
          onChangeText={name => this.setState({ name })}
        />

        <FormLabel>Address</FormLabel>

        <View
          style={{
            width: '100%',
            height: '40%',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: '#f4f4f4',
          }}
        >
          <AddressSearchInput onAddressChange={handleAddressChange} />
        </View>

        <Mutation
          mutation={CREATE_PLACE_MUTATION}
          onCompleted={allPlacesQuery.refetch}
        >
          {createPlaceMutation => (
            <Button
              loading={isLoading}
              loadingProps={{ size: 'large', color: '#009688' }}
              backgroundColor="#009688"
              onPress={
                address
                  ? () => handleCreatePlace(createPlaceMutation)
                  : () => false
              }
              title="create place"
            />
          )}
        </Mutation>
      </View>
    )
  }
}

export default CreatePlace
