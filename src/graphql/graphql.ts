import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from "graphql";

import { listings } from "../listings";

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    image: {
      type: GraphQLNonNull(GraphQLString)
    },
    address: {
      type: GraphQLNonNull(GraphQLString)
    },
    price: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    numOfGuest: {
      type: GraphQLNonNull(GraphQLInt)
    },
    numOfBeds: {
      type: GraphQLNonNull(GraphQLInt)
    },
    numOfBaths: {
      type: GraphQLNonNull(GraphQLInt)
    },
    rating: {
      type: GraphQLNonNull(GraphQLInt)
    }
  }
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    listings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
      resolve: () => listings
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteListing: {
      type: GraphQLNonNull(Listing),
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, { id }) => {
        for (let index = 0; index < listings.length; index++) {
          if (listings[index].id === id) {
            return listings.splice(index, 1)[0];
          }
        }
        throw new Error("no listing of given id");
      }
    }
  }
});

export const schema = new GraphQLSchema({ query, mutation });
