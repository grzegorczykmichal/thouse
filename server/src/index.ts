require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./db";

const APP_NAME = process.argv[2] || "app";

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
  app.listen(process.env.PORT);
  console.log(
    `\u001b[31m[${APP_NAME}]\u001b[0m Listening on ${process.env.PORT}`
  );
};

mount(express());
