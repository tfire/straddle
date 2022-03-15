import "./index.css";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import App from "./App";

// This is the official Aave subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/aave/protocol",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App which_view="home"/>} />
        <Route path="/staking" element={<App which_view="staking" />} />
        <Route path="/rewards" element={<App which_view="rewards"/>} />
        <Route path="/treasury" element={<App which_view="treasury"/>} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root"),
);
