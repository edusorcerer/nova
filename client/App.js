import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Header } from "react-native-elements"

import PlacesList from "./PlacesList"

export default class LoL extends React.Component {
  state = {
    places: [
      {
        name: "teste",
        lat: "123",
        longi: "321"
      }
    ]
  }

  render() {
    const { places, users } = this.state

    return (
      <View>
        <View>
          <Header
            leftComponent={{ icon: "menu", color: "#fff" }}
            centerComponent={{
              text: "Balada Finder",
              style: { color: "#fff" }
            }}
            rightComponent={{ icon: "home", color: "#fff" }}
          />
        </View>

        <PlacesList places={places} />
      </View>
    )
  }
}
