import React from "react"
import { View, Text } from "react-native"
import { Header } from "react-native-elements"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

import PlacesList from "./PlacesList"
import CreatePlace from "./CreatePlace"

const Layout = props => {
  // The places GraphQL query is coming via props because of react-apollo HOC
  const { allPlacesQuery } = props
  const { allPlaces } = allPlacesQuery

  return (
    <View>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "Balada Finder",
          style: { color: "#fff" }
        }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />

      {/* @TODO: react-router to navigate between CreatePlace and PlacesList */}
      <CreatePlace allPlacesQuery={allPlacesQuery} />

      <Text style={{ color: "#000", fontSize: 22 }}>PlacesList</Text>
      {allPlacesQuery.loading ? (
        <Text>Loading places...</Text>
      ) : (
        <PlacesList allPlacesQuery={allPlacesQuery} places={allPlaces} />
      )}
    </View>
  )
}

const ALL_PLACES_QUERY = gql`
  query {
    allPlaces {
      id
      name
      address {
        city
        state
      }
    }
  }
`

const LayoutWithAllPlacesQuery = graphql(ALL_PLACES_QUERY, {
  name: "allPlacesQuery"
})(Layout)

export default LayoutWithAllPlacesQuery
