import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import AppRouter from './AppRouter'
import AddressSearch from './AddressSearch'

class Layout extends Component {
  state = {
    address: null,
  }

  render() {
    const { address } = this.state
    return address ? (
      <AppRouter />
    ) : (
      <View style={styles.screen}>
        <Text style={styles.paragraph}>enter your address to continue</Text>
        <View style={styles.container}>
          <AddressSearch />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    marginBottom: 24,
    color: '#000',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1c1c1',
  },
  container: {
    width: '80%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
})

export default Layout
