import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Resource from "./Resource/Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";
import { useHistory } from "react-router-dom";

import {
  Button,
  Container,
  // Icon,
  // Pagination,
  Header,
  Grid,
} from "semantic-ui-react";
import Filter from "./Filter";
import NotFound from "./NotFound";
import "./Content.css";

const Content = ({ getResources, resources, filter }) => {
  // When page loads for the first time, load resources from the database
  // into the Redux store. From there they are displayed with React.
  const searchedResources = useSelector((state) => state.searchedResources);
  const update = useSelector((state) => state.update);
  const error = useSelector((state) => state.error);
  const logIn = useSelector((state) => state.logIn);
  const history = useHistory();

  useEffect(() => {
    console.log(searchedResources);
    getResources();
  }, [update, getResources]);

  return (
    <React.Fragment>
      <Container textAlign={"center"} className="intro-text">
        <img src="./images/logo_200x200.png" alt="Logo" className="logo" />
        {/* Logo Source: https://editor.freelogodesign.org/?lang=en&logo=4ff63ae3-b5d0-4e0d-8eac-d4a7d7892daa */}
        <p>
          Search <strong>material</strong> for a specific web development{" "}
          <strong>topic</strong> ...
        </p>
      </Container>
      {error === {} ? <NotFound /> : <Filter />}
      <Grid doubling padded columns={2} className="references-container">
        <Grid.Row>
          <Grid.Column
            style={{
              marginTop: "1em",
            }}
          >
            <Button
              style={{
                width: "200px",
                height: "80px",
                color: "var(--violett-dark)",
              }}
              content="Add Resource"
              icon="add circle"
              labelPosition="left"
              primary
              floated="right"
              marginTop="2em !important"
              onClick={() => {
                logIn ? history.push("/add_resource") : history.push("/login");
              }}
            />

            <section className="pagination">
              Found <strong>{resources.length}</strong> Entries
            </section>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {searchedResources.map((item) => {
            let showByCategory = false;
            let showByRating = false;
            let showByCost = false;
            // let showByCurrentPage = false;

            // FILTER FOR CATEGORIES
            let categories = ["general", "frontend", "backend", "database"];
            categories.forEach((cat) => {
              if (filter[cat] === true && item.category.includes(cat)) {
                showByCategory = true;
              }
            });

            // FILTER FOR FREE/PAID RESOURCES

            if (filter.free === true && item.paid === false) {
              showByCost = true;
            }
            if (filter.paid === true && item.paid === true) {
              showByCost = true;
            }

            // FILTER FOR RATING
            if (Math.floor(item.rating) >= filter.rating) {
              showByRating = true;
            }
            if (showByCost && showByRating && showByCategory)
              return (
                <Grid.Column key={item._id}>
                  <Resource id={item._id} data={item} />
                </Grid.Column>
              );
            return "";
            // } else return "";
          })}
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

Content.propTypes = {
  getResources: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  resources: state.resources,
  filter: state.filter,
});
export default connect(mapStateToProps, { getResources })(Content);
