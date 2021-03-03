import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Content from "./components/Content";
import Resource from "./components/Resource/Resource"
import AddResource from "./components/AddResource";
import MyResources from "./components/settings/MyResources"
import MyComments from "./components/settings/MyComments"
import Settings from "./components/settings/Settings";
import UpdateResource from "./components/settings/UpdateResource";
import NotFound from "./components/NotFound";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Filter />
      <Switch>
        <main>
          <Route path='/home' component={Home} />
          <Route path='/resource' component={Resource} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/' exact={true} component={Content} />
          <Route path='/settings' component={Settings} />
          <Route path='/add_resource' component={AddResource} />
          <Route path='/my_resources' component={MyResources} />
          <Route path='/my_comments' component={MyComments} />
          <Route path='/update_resource' component={UpdateResource} />
          <Route path='#!' component={NotFound} />
        </main>
      </Switch>
      <footer></footer>
    </Router>
  );
}
