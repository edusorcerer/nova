import React from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'

import PlacesList from './components/PlacesList'
import CreatePlace from './components/CreatePlace'

class App extends React.Component {
  state = {
    places: [
      {
        id: '1',
        name: 'A Good Place',
        address: {
          addressType: 'residential',
          city: 'Fjarðabyggð',
          complement: '',
          country: 'Iceland',
          neighborhood: 'Fáskrúðsfjörður',
          number: 10,
          postalCode: '',
          state: 'Austurland',
          street: '',
          geoCoordinates: {
            lat: 64.928923,
            longi: -14.006109,
          },
        },
      },
      {
        id: '2',
        name: 'Nice Place',
        address: {
          addressType: 'residential',
          city: 'Florianópolis',
          complement: 'Oasis',
          country: 'Brazil',
          neighborhood: 'Itacorubi',
          number: 300,
          postalCode: '89040-040',
          state: 'Santa Catarina',
          street: 'Rod. Amaro Antônio Viêira',
          geoCoordinates: {
            lat: 64.928923,
            longi: -14.006109,
          },
        },
      },
    ],
  }

  render() {
    const { places } = this.state

    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: 'Balada Finder',
            style: { color: '#fff' },
          }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />

        {/* @TODO: react-router to navigate between CreatePlace and PlacesList */}
        <CreatePlace />

        <PlacesList places={places} />
      </View>
    )
  }
}

export default App
