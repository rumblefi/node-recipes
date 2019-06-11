import React from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import App from '../App/App'

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError}) => {
        if(networkError) {
            console.error('networkError', networkError)
            if(networkError.statusCode === 401) {
                localStorage.removeItem('token')
            }
        }
    }
})

const Root = () => (
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
)

export default Root