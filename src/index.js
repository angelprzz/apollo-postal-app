const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')

const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('../config')

const PORT = process.env.port || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) 
});

mongoose
  .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })