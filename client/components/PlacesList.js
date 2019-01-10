import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Button } from "react-native-elements"

const PlacesList = props => {
  const { allPlacesQuery } = props
  const { allPlaces } = allPlacesQuery

  return allPlacesQuery.loading ? (
    <Text>Loading places...</Text>
  ) : (
    <ScrollView>
      <Button title="create a place" onPress={() => props.navigation.navigate("Create")} />
      {allPlaces &&
        allPlaces.map(({ id, name, address: { city, state } }) => (
          <View key={id}>
            <Text>
              {id} - {name}{" "}
              <Text style={styles.paragraph}>
                {city}, {state}
              </Text>
            </Text>
            <Mutation mutation={DELETE_PLACE_MUTATION} onCompleted={allPlacesQuery.refetch}>
              {(deletePlaceMutation, { data }) => (
                <Button
                  title="delete"
                  onPress={deletePlaceMutation ? () => deletePlaceMutation({ variables: { id } }) : () => true}
                />
              )}
            </Mutation>
          </View>
        ))}
    </ScrollView>
  )
}

const DELETE_PLACE_MUTATION = gql`
  mutation deletePlace($id: ID!) {
    deletePlace(id: $id) {
      id
    }
  }
`

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
    color: "#000",
    fontWeight: "bold"
  }
})

export default PlacesList
