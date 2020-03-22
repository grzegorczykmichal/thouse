import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Listings, Home, Host, Listing, NotFound, User } from "./sections";

import "./styles/index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const apollo = new ApolloClient({
  // uri: "http://localhost:9000/api"
  uri: "/api"
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing/:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

render(
  <ApolloProvider client={apollo}>
    <App />
    {/* <Listings title="Sone Kleenebok Listing" /> */}
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
