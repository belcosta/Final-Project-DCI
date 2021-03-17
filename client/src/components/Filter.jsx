import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Form,
  Checkbox,
  Rating,
  Header,
  Button,
  // Container,
} from "semantic-ui-react";
import {
  filterCategory,
  filterFree,
  filterPaid,
  filterRating,
  searchResources,
  getResources,
} from "../redux/actions";
import "./Filter.css";

export default function Filter() {
  const history = useHistory();
  // In the beginning all resources are shown: free, paid and all ratings.
  const dispatch = useDispatch();
  let initialState = {
    free: true,
    paid: true,
    rating: 0,
    general: true,
    frontend: true,
    backend: true,
    database: true,
    search: "",
  };
  const filter = useSelector((state) => state.filter);
  // React Hook to store the active filter settings
  const [filterData, setFilterData] = useState(filter);
  // React Hook to store state of Semantic UI React - Rating component
  const [rating, setRating] = useState(false);
  // Function that handles the changes of the Rating component

  function onFilterRating(e, { rating, maxRating }) {
    setRating(rating);
  }

  // FILTER -- RATING
  useEffect(() => {
    if (rating) dispatch(filterRating(rating));
    // FILTER -- CATEGORY -- "general"
    if (filterData.general) dispatch(filterCategory("general", true));
    else dispatch(filterCategory("general", false));
    // FILTER -- CATEGORY -- "frontend"
    if (filterData.frontend) dispatch(filterCategory("frontend", true));
    else dispatch(filterCategory("frontend", false));
    // FILTER -- CATEGORY -- "backend"
    if (filterData.backend) dispatch(filterCategory("backend", true));
    else dispatch(filterCategory("backend", false));
    // FILTER -- CATEGORY -- "database"
    if (filterData.database) dispatch(filterCategory("database", true));
    else dispatch(filterCategory("database", false));
    // FILTER -- FREE RESOURCES
    if (filterData.free) dispatch(filterFree(true));
    else dispatch(filterFree(false));
    // FILTER -- PAID RESOURCES
    if (filterData.paid) dispatch(filterPaid(true));
    else dispatch(filterPaid(false));
    return () => {
      // cleanup
    };
  }, [rating, filterData, dispatch]);

  function handleCheckboxChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.checked });
  }

  function handleSearchChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    // e.preventDefault();
    // console.log(e.target.value);
    // dispatch(searchResources(e.target.value));
  }

  function search(e) {
    e.preventDefault();
    // console.log("Searching for...", filterData.search);
    dispatch(searchResources(filterData.search));
    history.push("/home");
  }

  return (
    <React.Fragment>
      <Grid as="section">
        {/* ---------- SEARCH BAR ---------- */}
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Form size="big">
              <Form.Input
                focus
                icon="search"
                iconPosition="left"
                type="search"
                name="search"
                id="search"
                placeholder='Search... (for example "React", or "Git")'
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData(filter);
                  if (e.target.value === "") {
                    dispatch(getResources());
                  } else {
                    dispatch(searchResources(e.target.value));
                    history.push("/home");
                  }
                }}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={2} divided padded="horizontally">
        {/* ---------- FILTER ---------- */}
        <Grid.Row className="filter-container">
          <Grid.Column>
            <Header as="h3">Filter by Category</Header>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Checkbox
                    toggle
                    id="general"
                    name="general"
                    onChange={handleCheckboxChange}
                    checked={filterData.general}
                    label="General"
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    id="frontend"
                    name="frontend"
                    onChange={handleCheckboxChange}
                    checked={filterData.frontend}
                    label="Frontend"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <Checkbox
                    toggle
                    id="backend"
                    name="backend"
                    onChange={handleCheckboxChange}
                    checked={filterData.backend}
                    label="Backend"
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    id="database"
                    name="database"
                    onChange={handleCheckboxChange}
                    checked={filterData.database}
                    label="Database"
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Filter by Price</Header>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="free"
                          id="filter-free"
                          onChange={handleCheckboxChange}
                          checked={filterData.free}
                          label="Free"
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="paid"
                          id="filter-paid"
                          onChange={handleCheckboxChange}
                          checked={filterData.paid}
                          label="Paid"
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Header as="h3" className="rating-header">
                    Filter by Rating
                  </Header>
                  <Rating
                    maxRating={5}
                    defaultRating={0}
                    icon="star"
                    size="huge"
                    onRate={onFilterRating}
                  />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Button
                    style={{ marginTop: "0.5em" }}
                    onClick={() => {
                      setFilterData(initialState);
                    }}
                  >
                    Reset filter
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}
