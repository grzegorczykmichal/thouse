import { MongoClient } from "mongodb";
import { Database, User, Listing, Booking } from "../lib/types";

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

const connectionString = `mongodb+srv://${user}:${password}@${cluster}.gcp.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db("main");

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users")
  };
};
