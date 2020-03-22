import { ObjectId, Collection } from "mongodb";

export interface Listing {
  _id: ObjectId;
}

export interface Booking {
  _id: ObjectId;
}

export interface User {
  _id: ObjectId;
}

export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
