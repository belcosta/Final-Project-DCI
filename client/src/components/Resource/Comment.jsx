import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import axios from "axios";
import ModalBox from "../ModalBox";
import moment from "moment";
import {
  Button,
  Card,
  Header,
  Form,
  Input,
  Grid,
  Dropdown,
  Divider,
} from "semantic-ui-react";

export default function Comment(props) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [comment, setComment] = useState(props.data);
  const [edit, setEdit] = useState(false);
  //modal to delete
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  //if user send request, the "edited" and "date" will be updated
  useEffect(() => {
    setComment({
      ...comment,
      edited: true,
    });
  }, [edit]);

  let displayButtons = (boolean) => {
    setEdit(boolean);
  };
  let formHandler = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
      edited: true,
    });
  };

  let updateComment = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `/comments/${comment._id}`,
      ContentType: "application/json; charset=utf-8",
      data: comment,
    })
      .then(async (response) => {
        await dispatch(updateData(update));
        setEdit(false);
        console.log("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let delComment = () => {
    axios({
      method: "DELETE",
      url: `/comments/${props.data._id}`,
      ContentType: "application/json; charset=utf-8",
    })
      .then((response) => {
        dispatch(updateData(update));
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid divided="vertically">
      <Divider />
      <Grid.Row
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
        column={2}
      >
        {props.data.user ? (
          <Header style={{ color: "blue" }} as="h4">
            {props.data.user.userName}
          </Header>
        ) : (
          <Header as="h4">anonymous</Header>
        )}

        <Card.Meta>{moment(props.data.date).fromNow()}</Card.Meta>

        <div>
          {props.data.user && props.data.user._id === user._id && !edit && (
            <div style={{ display: "flex" }}>
              <Dropdown
                //text="..."
                style={{
                  backgroundColor: "var(--yellow-light)",
                  color: "white",
                  fontSize: "1.4rem",
                  padding: "0.3rem",
                  borderRadius: "10px",
                  marginRight: "10px",
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="edit"
                    onClick={() => {
                      displayButtons(true);
                    }}
                  />
                  <Dropdown.Item
                    icon="trash"
                    onClick={() => setDeleteModal(true)}
                  />
                </Dropdown.Menu>
              </Dropdown>
              <ModalBox
                header="Delete Comment"
                text="Are you sure you want to delete this comment?"
                action={delComment}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
              />
            </div>
          )}
        </div>
      </Grid.Row>

      {!edit && (
        <Header
          as="h4"
          style={{
            justifyContent: "start",
            marginLeft: "30px",
            marginTop: "-15px",
          }}
        >
          {props.data.text}
        </Header>
      )}

      {edit && (
        <Form onSubmit={(e) => updateComment(e)}>
          <Input
            type="text"
            name="text"
            disabled={
              props.data.user._id === user._id && edit ? null : "disabled"
            }
            value={comment.text}
            onChange={formHandler}
          ></Input>
          {edit && (
            <div style={{ display: "flex" }}>
              <Button
                style={{
                  backgroundColor: "var(--blue-dark)",
                  color: "white",
                  padding: "0.6rem",
                  borderRadius: "10px",
                  marginRight: "0.3rem",
                }}
                onClick={() => {
                  displayButtons(false);
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "var(--blue-light)",
                  color: "white",
                  padding: "0.6rem",
                  borderRadius: "10px",
                  marginRight: "0.3rem",
                }}
                type="submit"
              >
                Save
              </Button>
            </div>
          )}
        </Form>
      )}

      {props.data.edited && (
        <Card.Meta style={{ marginTop: "-16px" }}>Edited</Card.Meta>
      )}
    </Grid>
  );
}
