import { listings } from "./../listings";
import { IResolvers } from "apollo-server-express";

const resolvers: IResolvers<undefined> = {
  Query: {
    listings: () => listings
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let index = 0; index < listings.length; index++) {
        if (listings[index].id === id) {
          return listings.splice(index, 1)[0];
        }
      }
      throw new Error("no listing of given id");
    }
  }
};

export { resolvers };
