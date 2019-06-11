const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})
const Recipe = require('./models/Recipe')
const User = require('./models/User')
const bodyParser = require('body-parser')
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')
const cors = require('cors')
const jwt = require('jsonwebtoken')

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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


// set up JWT authentication middleware
app.use(async (req,res,next) => {
    const token = req.headers['authorization']   
    if(token !== "null") {
        try {
            const currentUser = await jwt.verify(token,process.env.SECRET)
            req.currentUser = currentUser
        } catch (error) {
            console.error(error)
        }
    }
    next()
})

//create graphiql application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

//connect schemas with GraphQl
app.use('/graphql', 
    bodyParser.json(),
    graphqlExpress( ({currentUser}) => ({
        schema,
        context: {
            Recipe,
            User,
            currentUser
        }
    }))
)

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})