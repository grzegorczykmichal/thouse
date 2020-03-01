// require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./db";

const APP_NAME = process.argv[2] || "app";
const PORT = process.env.PORT || 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  app.use(express.static(`${__dirname}/client`));
  app.get("/*", (req, res) => res.sendFile(`${__dirname}/client/index.html`));
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db
    })
  });

  apollo.applyMiddleware({ app, path: "/api" });
  app.listen(PORT);
  console.log(`\u001b[31m[${APP_NAME}]\u001b[0m Listening on ${PORT}`);
};

console.log(process.env.npm_package_version);

mount(express());
