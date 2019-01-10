import React from "react"
import { createStackNavigator, createAppContainer } from "react-navigation"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

import PlacesList from "./PlacesList"
import CreatePlace from "./CreatePlace"

const AppRouter = props => {
  const AppNavigatorWithProps = createAppContainer(AppNavigator(props))

  return <AppNavigatorWithProps />
}

/**
 * Create the app navigation routes
 *
 * @param {Object} values The object to be passed to routes as props
 */
const AppNavigator = values =>
  createStackNavigator(
    {
      Home: props => <PlacesList {...props} {...values} />,
      Create: props => <CreatePlace {...props} {...values} />
    },
    {
      initialRouteName: "Home"
    }
  )

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

const AppRouterWithAllPlacesQuery = graphql(ALL_PLACES_QUERY, {
  name: "allPlacesQuery"
})(AppRouter)

export default AppRouterWithAllPlacesQuery
