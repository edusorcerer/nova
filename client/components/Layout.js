import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { path } from 'ramda'

import AppRouter from './AppRouter'
import AddressSearchInput from './AddressSearchInput'

class Layout extends Component {
  state = {
    address: null,
  }

  handleAddressChange = (data, place) => {
    const address = this.getParsedAddress(place)

    this.setState({ address })
  }

  /**
   * The place object returned from Google Maps API has some extra informations about the address that won't be used.
   * So, this function will reduce nested address information into a simpler consumable object.
   *
   * @param {Object} place The place object returned from Google Maps API
   * @returns {Object} The reduced address data with only necessary fields/information
   */
  getParsedAddress = place => {
    const parsedAddressComponents = place.address_components.reduce(
      (accumulator, address) => {
        const parsedItem = address.types.reduce(
          (accumulator, type) => ({
            ...accumulator,
            [type]: address.short_name,
          }),
          {},
        )
        return { ...accumulator, ...parsedItem }
      },
      {},
    )

    const { lat, lng } = path(['geometry', 'location'], place) || {}
    // lat and lng may come as a function or a double
    const latitude = typeof lat === 'function' ? lat() : lat
    const longitude = typeof lng === 'function' ? lng() : lng

    const address = {
      addressType: 'residential',
      city:
        parsedAddressComponents.administrative_area_level_2 ||
        parsedAddressComponents.locality,
      complement: '',
      /* Google Maps API returns Alpha-2 ISO codes, but checkout API requires Alpha-3 */
      country: parsedAddressComponents.country,
      neighborhood: parsedAddressComponents.sublocality_level_1,
      number: parsedAddressComponents.street_number || '',
      postalCode: parsedAddressComponents.postal_code,
      receiverName: '',
      state: parsedAddressComponents.administrative_area_level_1,
      street: parsedAddressComponents.route,
      geoCoordinates:
        latitude && longitude
          ? { lat: latitude.toString(), longi: longitude.toString() }
          : null,
    }

    return address
  }

  render() {
    const { getParsedAddress, handleAddressChange, state } = this
    const { address } = state

    return address ? (
      <AppRouter address={address} getParsedAddress={getParsedAddress} />
    ) : (
      <View style={styles.screen}>
        <Text style={styles.paragraph}>enter your address to continue</Text>
        <View style={styles.container}>
          <AddressSearchInput onAddressChange={handleAddressChange} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    marginBottom: 24,
    color: '#000',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1c1c1',
  },
  container: {
    width: '80%',
    height: '40%',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
})

export default Layout
