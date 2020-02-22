require("dotenv").config();
import faker from "faker";
import { connectDatabase } from "../src/db";
import { Listing } from "../src/lib/types";
import { ObjectId } from "mongodb";
console.log("[seed]: Running...");
const seed = async () => {
  try {
    const db = await connectDatabase();
    const listings: Listing[] = [
      {
        _id: new ObjectId(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
      },
      {
        _id: new ObjectId(),
        title: "Luxurious home with private pool",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
        address: "100 Hollywood Hills Dr, Los Angeles, California",
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4
      },
      {
        _id: new ObjectId(),
        title: "Single bedroom located in the heart of downtown San Fransisco",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
        address: "200 Sunnyside Rd, San Fransisco, California",
        price: 25000,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3
      }
    ];

    db.listings.insertMany(listings);
    console.log("[seed]: Finished");
  } catch (error) {
    throw new Error("Failed to seed");
  }
};

const send = async (listings: Listing[]) => {
  const db = await connectDatabase();
  try {
    db.listings.insertMany(listings);
  } catch (error) {
    throw new Error("Failed to seed");
  }
};

const fake: () => Listing = () => {
  return {
    _id: new ObjectId(),
    title: faker.lorem.words(faker.random.number({ min: 2, max: 6 })),
    image: faker.image.imageUrl(),
    address: `${faker.address.streetAddress()} ${faker.address.streetName()}, ${faker.address.zipCode()} ${faker.address.city()}`,
    price: Number.parseInt(faker.finance.amount()),
    numOfGuests: faker.random.number({ min: 1, max: 5 }),
    numOfBeds: faker.random.number({ min: 1, max: 3 }),
    numOfBaths: faker.random.number({ min: 1, max: 3 }),
    rating: faker.random.number({ min: 1, max: 10 })
  };
};

const args = process.argv.slice(2);
if (args.length === 1) {
  const fakes: Listing[] = [];
  console.log(`Faking ${args[0]} items.`);
  for (let i = 0; i < Number.parseInt(args[0]); i++) {
    fakes.push(fake());
  }
  send(fakes);
  console.log("[seed]: Finished");
} else {
  seed();
}
