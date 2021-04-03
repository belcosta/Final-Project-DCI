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
import { useHistory } from "react-router-dom";
import { getDashboardData, filterCategory } from "../redux/actions";
import "./Home.css";
import axios from "axios";
import { Spring } from "react-spring/renderprops";

const Home = ({ getDashboardData, dashboard }) => {
  const logIn = useSelector((state) => state.logIn);
  const filter = useSelector((state) => state.filter);
  const [firstDashboardLoad, setFirstDashboardLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(true);
  //const [resource, setResource]= useState({});
  const dispatch = useDispatch();
  const history = useHistory();

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
        setComments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid className='dashboard-container'>
      <Grid columns={2} padded className='dashboard-grid'>
        <Grid.Row centered>
          <Grid.Column
            // className="dashboard-content"
            className='dashboard-sidebar sidebar-left'
            mobile={14}
            tablet={8}
            computer={12}
          >
            <Grid>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 400, duration: 400 }}
              >
                {(props) => (
                  <Grid.Row centered style={props}>
                    <Button
                      style={{ width: "150px", margin: "1em" }}
                      content='See Resource'
                      icon='linkify'
                      labelPosition='left'
                      secondary
                      onClick={async () => {
                        await dispatch(filterCategory("general", true));
                        await dispatch(filterCategory("frontend", true));
                        await dispatch(filterCategory("backend", true));
                        await dispatch(filterCategory("database", true));
                        history.push("/home");
                      }}
                    />
                  </Grid.Row>
                )}
              </Spring>
            </Grid>

            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 500, duration: 500 }}
            >
              {(props) => (
                <Grid style={props} columns={2} doubling padded>
                  <Grid.Row centered>
                    <Grid.Column
                      mobile={14}
                      tablet={8}
                      computer={12}
                      className='dashboard-frontend'
                    >
                      <Header as='h3'>Frontend</Header>
                      <Container>
                        <Button
                          style={{ margin: "10px" }}
                          onClick={async () => {
                            await dispatch(filterCategory("general", false));
                            await dispatch(filterCategory("frontend", true));
                            await dispatch(filterCategory("backend", false));
                            await dispatch(filterCategory("database", false));
                            history.push("/home");
                          }}
                        >
                          <Icon name='arrow right' />
                        </Button>
                        <img
                          src='./illustrations/frontend3.svg'
                          alt='Frontend Illustration'
                          className='illustration'
                        />
                      </Container>
                    </Grid.Column>

                    <Spring
                      from={{ opacity: 0 }}
                      to={{ opacity: 1 }}
                      config={{ delay: 900, duration: 900 }}
                    >
                      {(props) => (
                        <Grid.Column
                          style={props}
                          mobile={14}
                          tablet={4}
                          computer={6}
                          className='dashboard-backend'
                        >
                          <Header as='h3'>Backend</Header>
                          <Container>
                            <Button
                              onClick={async () => {
                                await dispatch(
                                  filterCategory("general", false)
                                );
                                await dispatch(
                                  filterCategory("frontend", false)
                                );
                                await dispatch(filterCategory("backend", true));
                                await dispatch(
                                  filterCategory("database", false)
                                );
                                history.push("/home");
                              }}
                            >
                              <Icon name='arrow right' />
                            </Button>
                            <img
                              src='./illustrations/backend.svg'
                              alt='Backend Illustration'
                              className='illustration'
                            />
                          </Container>
                        </Grid.Column>
                      )}
                    </Spring>

                    <Spring
                      from={{ opacity: 0 }}
                      to={{ opacity: 1 }}
                      config={{ delay: 1000, duration: 1000 }}
                    >
                      {(props) => (
                        <Grid.Column
                          style={props}
                          mobile={14}
                          tablet={4}
                          computer={6}
                          className='dashboard-database'
                        >
                          <Header as='h3'>Database</Header>
                          <Container>
                            <img
                              src='./illustrations/database.svg'
                              alt='Database Illustration'
                              className='illustration'
                            />
                            <Button
                              style={{ margin: "10px" }}
                              onClick={async () => {
                                await dispatch(
                                  filterCategory("general", false)
                                );
                                await dispatch(
                                  filterCategory("frontend", false)
                                );
                                await dispatch(
                                  filterCategory("backend", false)
                                );
                                await dispatch(
                                  filterCategory("database", true)
                                );
                                history.push("/home");
                              }}
                            >
                              <Icon name='arrow right' />
                            </Button>
                          </Container>
                        </Grid.Column>
                      )}
                    </Spring>
                  </Grid.Row>
                </Grid>
              )}
            </Spring>
          </Grid.Column>

          {/* <Grid.Column width={1} className="dashboard-content"></Grid.Column> */}
          <Grid.Column
            centered
            mobile={14}
            tablet={5}
            computer={4}
            className='dashboard-sidebar sidebar-right'
          >
            {" "}
            <Grid>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 400, duration: 400 }}
              >
                {(props) => (
                  <Grid.Row centered style={props}>
                    <Button
                      style={{
                        width: "150px",
                        margin: "1em",
                        color: "var(--violett-dark)",
                        backgroundColor: "var(--yellow-light)",
                      }}
                      content='Add Resource'
                      icon='add circle'
                      labelPosition='left'
                      onClick={() => {
                        console.log(logIn);
                        logIn
                          ? history.push("/add_resource")
                          : history.push("/login");
                      }}
                    />
                  </Grid.Row>
                )}
              </Spring>
            </Grid>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 600, duration: 600 }}
            >
              {(props) => (
                <Card centered style={props} className='addedResources'>
                  <Card.Content>
                    <Card.Header>Recently added resources</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed>
                      {dashboard.map((activity) => {
                        return (
                          <Feed.Event>
                            <Feed.Label image='./images/molly.png' />
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
              )}
            </Spring>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 800, duration: 800 }}
            >
              {(props) => (
                <Card centered style={props}>
                  <Card.Content>
                    <Card.Header>Recent Activity</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {!loading && (
                      <Feed>
                        {comments.map((comment) => {
                          return (
                            <Feed.Event>
                              <Feed.Label image='./images/matthew.png' />
                              <Feed.Content>
                                <Feed.Date>
                                  {moment(comment.date).fromNow()}
                                </Feed.Date>
                                <Feed.Summary>
                                  {!comment.user
                                    ? "anonymous guest"
                                    : comment.user.userName[0].toUpperCase() +
                                      comment.user.userName.substring(1)}{" "}
                                  added a comment to the{" "}
                                  <em
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      history.push(
                                        `/resources/resource/${comment.resource._id}`
                                      );
                                    }}
                                  >
                                    {comment.resource.title}
                                  </em>{" "}
                                  resource.
                                </Feed.Summary>
                              </Feed.Content>
                            </Feed.Event>
                          );
                        })}
                      </Feed>
                    )}
                  </Card.Content>
                </Card>
              )}
            </Spring>
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
