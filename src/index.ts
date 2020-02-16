import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
// import bodyParser from "body-parser";

// import { listings } from "./listings";

const APP_NAME = process.argv[2] || "app";
const PORT = 9000;

const app = express();

const apollo = new ApolloServer({ typeDefs, resolvers });
apollo.applyMiddleware({ app, path: "/api" });

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

app.listen(PORT);

console.log(`\u001b[31m[${APP_NAME}]\u001b[0m Listening on ${PORT}`);
