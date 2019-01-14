import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation'
import { graphql } from 'react-apollo'

import PlacesList from './PlacesList'
import CreatePlace from './CreatePlace'
import PlaceDetail from './PlaceDetail'

import { ALL_PLACES_QUERY } from '../queries/Place'

const AppRouter = props => {
  const TabNavigatorWithProps = createAppContainer(TabNavigator(props))

  return <TabNavigatorWithProps />
}

/**
 * Create the home navigation routes
 *
 * @param {Object} values The object to be passed to routes as props
 */
const HomeStack = values =>
  createStackNavigator(
    {
      Home: props => <PlacesList {...props} {...values} />,
      PlaceDetail: props => <PlaceDetail {...props} {...values} />,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'places',
        headerStyle: {
          backgroundColor: '#009688',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  )

/**
 * Create the create page navigation routes
 *
 * @param {Object} values The object to be passed to routes as props
 */
const CreatePlaceStack = values =>
  createStackNavigator(
    {
      CreatePlace: props => <CreatePlace {...props} {...values} />,
    },
    {
      initialRouteName: 'CreatePlace',
      defaultNavigationOptions: {
        title: 'create a place',
        headerStyle: {
          backgroundColor: '#009688',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  )

/**
 * Create the app navigation routes
 *
 * @param {Object} values The object to be passed to routes as props
 */
const TabNavigator = values =>
  createBottomTabNavigator({
    Home: HomeStack(values),
    CreatePlace: CreatePlaceStack(values),
  })

const AppRouterWithAllPlacesQuery = graphql(ALL_PLACES_QUERY, {
  name: 'allPlacesQuery',
})(AppRouter)

export default AppRouterWithAllPlacesQuery
