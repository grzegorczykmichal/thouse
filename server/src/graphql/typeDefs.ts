import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Float!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }

  type Query {
    listings: [Listing!]!
  }
`;

export { typeDefs };
