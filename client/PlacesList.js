import React from "react"
import { StyleSheet, Text, View } from "react-native"

const PlacesList = props => {
  const { places } = props

  return (
    <View>
      <Text>PlacesList</Text>

      {places.map(({ name, lat, longi }) => (
        <View>
          <Text>{name}</Text>
          <Text style={styles.title}>{lat}</Text>
          <Text style={styles.paragraph}>{longi}</Text>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#666"
  },
  paragraph: {
    color: "#000"
  }
})

export default PlacesList
