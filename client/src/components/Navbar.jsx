import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";
import { Grid, Menu, Header, Icon, Dropdown } from "semantic-ui-react";
import "./Navbar.css";

export default function Navbar() {
  const logIn = useSelector((state) => state.logIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Grid
      verticalAlign="middle"
      padded
      columns={2}
      as="header"
      className="app-header"
    >
      <Grid.Row>
        <Grid.Column width={14} only="mobile">
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>
        <Grid.Column textAlign={"center"} width={2} only="mobile">
          <Dropdown item icon="bars" simple pointing="right">
            <Dropdown.Menu
              style={{
                margin: "1rem -1rem",
                backgroundColor: "var(--yellow-light",
              }}
            >
              <Dropdown.Item>
                <span style={{ color: "var(--violett-dark)" }}>
                  <Icon name="user" /> Hello, {user.name ? user.name : "Guest"}
                </span>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/home">
                  <Icon name="home" />
                  Home
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/about">
                  <Icon name="info circle" />
                  About
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/">
                  <Icon name="book" />
                  Resources
                </Link>
              </Dropdown.Item>
              {logIn ? (
                <React.Fragment>
                  <Dropdown.Item>
                    <Link to="/profile">
                      <Icon name="user circle" />
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/my_resources">
                      <Icon name="star" />
                      My Resources
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/my_comments">
                      <Icon name="comments" />
                      My Comments
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/logout"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("LOGOUT!");
                        dispatch(userLogout());
                      }}
                    >
                      <Icon name="logout" />
                      Logout
                    </Link>
                  </Dropdown.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Dropdown.Item>
                    <Link to="/register">
                      <Icon name="signup" />
                      Register
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/login">
                      <Icon name="sign-in" />
                      Login
                    </Link>
                  </Dropdown.Item>
                </React.Fragment>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>

        <Grid.Column floated="left" width={7} only="tablet computer">
          <Link to="/">
            <Header as="h1">Student Companion</Header>
          </Link>
        </Grid.Column>

        <Grid.Column
          as="nav"
          textAlign={"right"}
          floated="right"
          width={9}
          only="tablet computer"
        >
          <Menu compact secondary>
            <Menu.Item>
              <Link to="/home">
                <Icon name="home" />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about">
                <Icon name="info circle" />
                About
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                <Icon name="book" />
                Resources
              </Link>
            </Menu.Item>
            {logIn ? (
              <Menu.Item>
                <Dropdown
                  className="dropdown-label"
                  text={`Hello ${user.name}`}
                  icon="user"
                  simple
                >
                  <Dropdown.Menu
                    style={{
                      backgroundColor: "var(--yellow-light)",
                      border: "none",
                      margin: " -2rem ",
                    }}
                  >
                    <Dropdown.Item>
                      <span style={{ color: "var(--violett-dark)" }}>
                        <Icon name="user" /> Hello,{" "}
                        {user.name ? user.name : "Guest"}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/profile">
                        <Icon name="user circle" />
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/my_resources">
                        <Icon name="star" />
                        My Resources
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/my_comments">
                        <Icon name="comments" />
                        My Comments
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/home");
                          dispatch(userLogout());
                        }}
                      >
                        <Icon name="logout" />
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : (
              <React.Fragment>
                <Menu.Item>
                  <Link to="/register">
                    <Icon name="signup" />
                    Register
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/login">
                    <Icon name="sign-in" />
                    Login
                  </Link>
                </Menu.Item>
              </React.Fragment>
            )}
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
