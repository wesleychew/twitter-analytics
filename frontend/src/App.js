import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Analyze from "./components/Analyze";
import "./App.css";

function App(props) {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/user/:username" component={Analyze} />
    </BrowserRouter>
  );
}

export default App;
