import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";

import HomePage from "../components/HomePage";
import Error from "../components/Error";
import Favourites from "../components/Favourites";
import './index.scss'

const AllRoutes = () => (
    <Router>
      <Switch>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/favourite" element={<Favourites />} />
        <Route path="*" element={<Error />} />
      </Switch>
    </Router>
  );

export default AllRoutes