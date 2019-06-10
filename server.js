const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})
const Recipe = require('./models/Recipe')
const User = require('./models/User')
const bodyParser = require('body-parser')
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

//bring in GraphQl-Express middleware
const {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')

//create schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

//connects to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Db connected'))
    .catch(error => console.error(error))

//initialize application

const app = express()

//create graphiql application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

//connect schemas with GraphQl
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}))

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})