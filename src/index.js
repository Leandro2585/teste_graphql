// Query => GET
// Mutation => POST,PATCH,PUT,DELETE
// Scalar Types => String, Int, Boolean, Float, ID

const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

const userExample = [
    { _id: String(Math.random()), name: 'Leandro Real', email: 'leo.real2585@gmail.com', active: true },
    { _id: String(Math.random()), name: 'Leandro Vieira', email: 'leo.vieira2585@gmail.com', active: true },
    { _id: String(Math.random()), name: 'Leandro Real Vieira', email: 'leoreal.vieira2585@gmail.com', active: true },
];
const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => userExample,
        getUserByEmail: (_, args) => {
            return userExample.find((user) => user.email === args.email)
        }
    },
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            };
            userExample.push(newUser);
            return newUser;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at ${url}`));
