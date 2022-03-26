import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBookInventory from "./components/add-bookInventory.component";
import BookInventory from "./components/bookInventory.component";
import BookInventorysList from "./components/bookInventorys-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/bookInventorys"} className="navbar-brand">
            Test Interview
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/bookInventorys"} className="nav-link">
                BookInventorys
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/bookInventorys"]} component={BookInventorysList} />
            <Route exact path="/add" component={AddBookInventory} />
            <Route path="/bookInventorys/:id" component={BookInventory} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
