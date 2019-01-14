import React, { Component } from 'react'
import { View } from 'react-native'
import { Mutation } from 'react-apollo'
import { Icon, ListItem, Button } from 'react-native-elements'

import { DELETE_PLACE_MUTATION } from '../../queries/Place'

class PlaceDetail extends Component {
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
    const { handleDeletePlace, props } = this
    const { allPlacesQuery, navigation } = props
    const { isDeletingPlace } = this.state
    const place = navigation.getParam('place', false)

    const {
      id,
      name,
      address: { city, state },
    } = place

    const placeInfos = [
      {
        label: 'Name',
        value: name,
      },
      {
        label: 'City',
        value: city,
      },
      {
        label: 'State',
        value: state,
      },
    ]

    if (!place) {
      console.log('no place found')
      const id = navigation.getParam('id', false)
    }

    return (
      <View>
        <Icon name="place" color="#0000ff" />
        {placeInfos &&
          placeInfos.map(({ label, value }, i) => (
            <ListItem key={i} title={`${label}: ${value}`} hideChevron={true} />
          ))}
        <Mutation mutation={DELETE_PLACE_MUTATION} onCompleted={allPlacesQuery.refetch}>
          {deletePlaceMutation => (
            <Button
              loading={isDeletingPlace}
              onPress={() => handleDeletePlace(deletePlaceMutation, id)}
              title="delete this place"
            />
          )}
        </Mutation>
      </View>
    )
  }
}

export default PlaceDetail
