require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./db";
// import bodyParser from "body-parser";

// import { listings } from "./listings";

const APP_NAME = process.argv[2] || "app";

// app.use(bodyParser.json());

// app.get("/listings", (_req, res) => res.send(listings));
// app.post("/delete-listings", (req, res) => {
//   const id: string = req.body.id;

//   for (let index = 0; index < listings.length; index++) {
//     if (listings[index].id === id) {
//       return res.send(listings.splice(index, 1));
//     }
//   }

//   return res.send();
// });

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db
    })
  });
  apollo.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.APP_PORT);
  console.log(
    `\u001b[31m[${APP_NAME}]\u001b[0m Listening on ${process.env.APP_PORT}`
  );

  const ls = await db.listings.find({}).toArray();
  console.log(ls);
};

mount(express());
