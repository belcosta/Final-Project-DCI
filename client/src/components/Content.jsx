import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Resource from "./Resource/Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";
import {
  Button,
  Container,
  Icon,
  Pagination,
  Header,
  Grid,
} from "semantic-ui-react";
import "./Content.css";

const Content = ({ getResources, resources, filter }) => {
  // When page loads for the first time, load resources from the database
  // into the Redux store. From there they are displayed with React.
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  const update = useSelector((state) => state.update);
  useEffect(() => {
    if (firstPageLoad) {
      getResources();
      console.log(resources);
      setFirstPageLoad(false);
    }
  }, [firstPageLoad, update, resources, getResources]);

  useEffect(() => {
    getResources();
  }, [update, getResources]);
  // TODO: once a Search or a Filter is applied, change the display accordingly

  // PAGINATION
  const [pagination, setPagination] = useState({
    perPage: 8,
    current: 1,
    max: 1,
    display: [1],
  });

  // Whenever the resources change (for example by searching)
  // the nr of max pages is calculated again. Also the display array
  // needed to render the buttons is created again, based on the new
  // number of pages.
  useEffect(() => {
    const maxPages = Math.ceil(resources.length / pagination.perPage);
    let pageDisplay = [];
    for (let i = 1; i <= maxPages; i++) {
      pageDisplay.push(i);
    }
    setPagination({ ...pagination, max: maxPages, display: pageDisplay });
  }, [resources]);

  function handlePageChange(e) {
    setPagination({
      ...pagination,
      current: parseInt(e.target.id.replace("page-", "")),
    });
  }

  return (
    <Grid doubling columns={2} className="references-container">
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">RESOURCES</Header>
          <Link to="/add_resource">
            <Button primary>
              <Icon name="add circle" />
              Add Resource
            </Button>
          </Link>
          <section className="pagination">
            Found <strong>{resources.length}</strong> Entries / Page:{" "}
            {pagination.current} of {pagination.max} /
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              siblingRange={0}
              totalPages={pagination.max}
            />
            {pagination.display.map((index) => {
              return (
                <Fragment>
                  <button
                    key={index}
                    id={"page-" + index}
                    onClick={handlePageChange}
                    className={index === pagination.current ? "active" : null}
                  >
                    {index}
                  </button>
                </Fragment>
              );
            })}
          </section>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {resources.map((item, index) => {
          let showByCategory = false;
          let showByRating = false;
          let showByCost = false;
          let showByCurrentPage = false;

          // FILTER FOR CATEGORIES
          let categories = [
            "general",
            "frontend",
            "backend",
            "database",
            "machineLearning",
          ];
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

          // FILTER BY CURRENT PAGE
          // page 1 -- index: 0-7
          // page 2 -- index: 8-15
          let start = (pagination.current - 1) * pagination.perPage;
          let end = pagination.current * pagination.perPage - 1;
          if (index >= start && index <= end) {
            showByCurrentPage = true;
          }
          // If resource matches all filter criteria, it is displayed
          if (showByCost && showByRating && showByCategory && showByCurrentPage)
            return (
              <Grid.Column>
                <Resource
                  id={item._id}
                  key={index}
                  data={item}
                  author="false"
                />
              </Grid.Column>
            );
          return "";
          // } else return "";
        })}
      </Grid.Row>
    </Grid>
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
