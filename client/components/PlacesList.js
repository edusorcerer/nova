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

  render() {
    const { handlePlaceClick, props } = this
    const { allPlacesQuery } = props
    const { allPlaces } = allPlacesQuery

    return allPlacesQuery.loading ? (
      <ActivityIndicator size="large" style={styles.loader} color="#009688" />
    ) : (
      <ScrollView>
        {allPlaces &&
          allPlaces.map(place => {
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
