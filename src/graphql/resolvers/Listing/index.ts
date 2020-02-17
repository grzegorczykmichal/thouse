import { Database, Listing } from "../../../lib/types";
import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";

const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleted = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });
      if (!deleted.value) {
        throw new Error("no listing of given id");
      }
      return deleted.value;
    }
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
};

export { listingResolvers };
