import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button, ButtonGroup, ListItem } from 'react-native-elements'

class PlacesList extends Component {
  state = {
    isDeletingPlace: false,
  }

  /**
   * Handler for deleting a place.
   * It sets the deleting place loader for the button and calls the mutation query
   *
   * @param {Function} deletePlaceMutation The mutation function coming from ApolloGraphQL
   * @param {String} id The id of the place to be deleted
   */
  handleDeletePlace = (deletePlaceMutation, id) => {
    this.setState({
      isDeletingPlace: true,
    })
    return deletePlaceMutation && deletePlaceMutation({ variables: { id } })
  }

  render() {
    const { handleDeletePlace, props, state } = this
    const { isDeletingPlace } = state
    const { allPlacesQuery } = props
    const { allPlaces } = allPlacesQuery

    return allPlacesQuery.loading ? (
      <ActivityIndicator size="large" style={styles.loader} color="#0000ff" />
    ) : (
      <ScrollView>
        <Button title="create a place" onPress={() => props.navigation.navigate('Create')} />
        {allPlaces &&
          allPlaces.map(({ id, name, address: { city, state } }) => (
            <View key={id}>
              <ListItem key={id} title={`${name} - ${city}`} leftIcon={{ name: 'place' }} />
            </View>
          ))}
      </ScrollView>
    )
  }
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
  loader: {
    marginTop: '30%',
  },
})

export default PlacesList
