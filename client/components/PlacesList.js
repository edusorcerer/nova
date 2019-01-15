import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'

class PlacesList extends Component {
  /**
   * Handler for clicking on a place.
   * It sends the user to the selected place detail page
   *
   * @param {String} id The id of the clicked place
   * @param {Object} place The selected place object
   */
  handlePlaceClick = (id, place) => {
    const { navigation } = this.props

    navigation.navigate('PlaceDetail', {
      place,
      id,
    })
  }

  calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const radlon1 = (Math.PI * lon1) / 180
    const radlon2 = (Math.PI * lon2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == 'K') {
      dist = dist * 1.609344
    }
    if (unit == 'N') {
      dist = dist * 0.8684
    }
    return dist
  }

  render() {
    const { calculateDistance, handlePlaceClick, props } = this
    const { address, allPlacesQuery } = props
    const { allPlaces } = allPlacesQuery

    if (allPlaces) {
      allPlaces.map(({ address: { geoCoordinates: { lat, longi } } }, i) => {
        allPlaces[i]['distance'] = calculateDistance(
          address.geoCoordinates.lat,
          address.geoCoordinates.longi,
          lat,
          longi,
          'K',
        )
      })
    }

    return allPlacesQuery.loading ? (
      <ActivityIndicator size="large" style={styles.loader} color="#009688" />
    ) : (
      <ScrollView onScrollEndDrag={() => allPlacesQuery.refetch()}>
        {allPlaces &&
          allPlaces
            .sort((a, b) => a.distance - b.distance)
            .map(place => {
              const {
                id,
                name,
                address: { city, state },
              } = place
              return (
                <View key={id}>
                  <ListItem
                    key={id}
                    title={`${name} - ${city}, ${state}`}
                    leftIcon={{ name: 'place' }}
                    onPress={() => handlePlaceClick(id, place)}
                  />
                </View>
              )
            })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    marginTop: '30%',
    color: '#009688',
  },
})

export default PlacesList
