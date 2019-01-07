import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Layout from './components/Layout'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjqlpnusraye10104mpl52ef1' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>
)

export default App
