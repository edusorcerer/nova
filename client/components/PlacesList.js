import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlacesList = props => {
  const { places } = props

  return (
    <View>
      {places &&
        places.map(({ id, name, address: { city, state } }) => (
          <View key={id}>
            <Text>
              {id} - {name}{' '}
              <Text style={styles.paragraph}>
                {city}, {state}
              </Text>
            </Text>
          </View>
        ))}
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#666',
  },
  paragraph: {
    color: '#000',
    fontWeight: 'bold',
  },
})

export default PlacesList
