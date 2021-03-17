import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Content from "./components/Content";
import AddResource from "./components/AddResource";
import MyResources from "./components/settings/MyResources";
import MyComments from "./components/settings/MyComments";
import About from "./components/About";
import ResourcePage from "./components/ResourcePage";
import UpdateResourcePage from "./components/settings/UpdateResourcePage";
import NotFound from "./components/NotFound";
import "./App.css";

export default function App() {
  // const error = useSelector((state) => state.error);
  return (
    <Router>
      <Navbar />

      <Switch>
        <main>
          <Route path="/" exact={true} component={Home} />
          <Route path="/home" component={Content} />
          <Route
            exact
            path="/resources/resource/:resourceId"
            component={ResourcePage}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/about" component={About} />
          <Route path="/add_resource" component={AddResource} />
          <Route path="/my_resources" component={MyResources} />
          <Route path="/my_comments" component={MyComments} />
          <Route
            exact
            path="/update_resource/:resourceId"
            component={UpdateResourcePage}
          />
          <Route path="#!" component={NotFound} />
        </main>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}
