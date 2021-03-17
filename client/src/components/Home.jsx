import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Container,
  Grid,
  Header,
  Card,
  Feed,
  Button,
  Icon,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getDashboardData, filterCategory } from "../redux/actions";
import "./Home.css";
import axios from "axios";

const Home = ({ getDashboardData, dashboard }) => {
  const logIn = useSelector((state) => state.logIn);
  const filter = useSelector((state) => state.filter);
  const [firstDashboardLoad, setFirstDashboardLoad] = useState(true);
  //const [resource, setResource]= useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [comments, setComments] = useState([
    { date: "10/06/09", username: "renata", resource: { title: "Node.js" } },
    { date: "10/06/09", username: "renata", resource: { title: "Node.js" } },
  ]);

  useEffect(() => {
    if (firstDashboardLoad) {
      getDashboardData();
      setFirstDashboardLoad(false);
      console.log("Dashboard Data:", dashboard);
    }
  }, [firstDashboardLoad, dashboard]);
  //getting last comments
  useEffect(() => {
    axios({
      method: "GET",
      url: "/comments",
    })
      .then((response) => {
        console.log("comments", response.data);
        /* setComments(response); */
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid className="dashboard-container">
      <Grid columns={3} padded className="dashboard-grid">
        <Grid.Row>
          <Grid.Column width={4} className="dashboard-sidebar sidebar-left">
            <Card centered>
              <Card.Content>
                <Card.Header>Recently added resources</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {dashboard.map((activity) => {
                    return (
                      <Feed.Event>
                        {/*  <Feed.Label image="./images/molly.png" /> */}
                        <Feed.Content>
                          <Feed.Date>
                            {moment(activity.date).fromNow()}
                          </Feed.Date>
                          <Feed.Summary>
                            {activity.user.userName[0].toUpperCase() +
                              activity.user.userName.substring(1)}{" "}
                            added <em>{activity.title} to the </em>
                            {activity.category[0]} category
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    );
                  })}
                </Feed>
              </Card.Content>
            </Card>
            <Card centered>
              <Card.Content>
                <Card.Header>Recent Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {comments.map((comment) => {
                    return (
                      <Feed.Event>
                        <Feed.Label image="./images/matthew.png" />
                        <Feed.Content>
                          <Feed.Date>
                            {moment(comment.date).fromNow()}
                          </Feed.Date>
                          <Feed.Summary>
                            José Luis added a comment to the{" "}
                            <em>Express/Node introduction</em> resource.
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    );
                  })}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8} className="dashboard-content">
            <Grid columns={2} doubling padded>
              <Grid.Row>
                <Grid.Column width={16} className="dashboard-frontend">
                  <Header as="h3">Frontend</Header>
                  <Container>
                    <p>{dashboard.length} resources</p>
                    <Button
                      onClick={async () => {
                        await dispatch(filterCategory("general", false));
                        await dispatch(filterCategory("frontend", true));
                        await dispatch(filterCategory("backend", false));
                        await dispatch(filterCategory("database", false));
                        history.push("/home");
                      }}
                    >
                      <Icon name="arrow right" />
                    </Button>
                    <img
                      src="./illustrations/frontend3.svg"
                      alt="Frontend Illustration"
                      className="illustration"
                    />
                  </Container>
                </Grid.Column>
                <Grid.Column width={8} className="dashboard-backend">
                  <Header as="h3">Backend</Header>
                  <Container>
                    <p>12 resources</p>
                    <Button
                      onClick={async () => {
                        await dispatch(filterCategory("general", false));
                        await dispatch(filterCategory("frontend", false));
                        await dispatch(filterCategory("backend", true));
                        await dispatch(filterCategory("database", false));
                        history.push("/home");
                      }}
                    >
                      <Icon name="arrow right" />
                    </Button>
                    <img
                      src="./illustrations/backend.svg"
                      alt="Backend Illustration"
                      className="illustration"
                    />
                  </Container>
                </Grid.Column>
                <Grid.Column width={8} className="dashboard-database">
                  <Header as="h3">Database</Header>
                  <Container>
                    <p>8 resources</p>
                    <img
                      src="./illustrations/database.svg"
                      alt="Database Illustration"
                      className="illustration"
                    />
                    <Button
                      onClick={async () => {
                        await dispatch(filterCategory("general", false));
                        await dispatch(filterCategory("frontend", false));
                        await dispatch(filterCategory("backend", false));
                        await dispatch(filterCategory("database", true));
                        history.push("/home");
                      }}
                    >
                      <Icon name="arrow right" />
                    </Button>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={4} className="dashboard-sidebar sidebar-right">
            <Container>
              <Button
                style={{ width: "150px", margin: "1em" }}
                content="See Resource"
                icon="linkify"
                labelPosition="left"
                secondary
                onClick={async () => {
                  await dispatch(filterCategory("general", true));
                  await dispatch(filterCategory("frontend", true));
                  await dispatch(filterCategory("backend", true));
                  await dispatch(filterCategory("database", true));
                  history.push("/home");
                }}
              />
            </Container>
            <Container>
              <Button
                style={{
                  width: "150px",
                  margin: "1em",
                  color: "var(--violett-dark)",
                }}
                content="Add Resource"
                icon="add circle"
                labelPosition="left"
                primary
                onClick={() => {
                  console.log(logIn);
                  logIn
                    ? history.push("/add_resource")
                    : history.push("/login");
                }}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
Home.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  dashboard: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});
export default connect(mapStateToProps, { getDashboardData })(Home);
