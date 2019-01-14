import React from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

const AddressSearch = ({ handleAddressChange }) => {
  return (
    <View style={{ width: '100%' }}>
      <FormLabel>Address</FormLabel>
      <FormInput onChangeText={handleAddressChange} />
    </View>
  )
}

export default AddressSearch
