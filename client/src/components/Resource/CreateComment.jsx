import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button, TextArea, Card, Popup } from "semantic-ui-react";

export default function CreateComment({
  resourceId,
  makeCom,
  showComm,
  showMakeComm,
}) {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const logIn = useSelector((state) => state.logIn);
  const [comment, setComment] = useState({
    resource: resourceId,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  function openCom(newValue) {
    showMakeComm(newValue);
  }

  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/comments",
      ContentType: "application/json; charset=utf-8",
      data: comment,
    })
      .then((res) => {
        showMakeComm(false);
        showComm(true);
        dispatch(updateData(update));
        console.log("here", res.data);
      })
      .catch((err) => console.log(err));
  };
  const formHandler = (e) => {
    setComment({ ...comment, user: user._id, [e.target.name]: e.target.value });
  };
  return (
    <Popup
      trigger={
        <div style={{ margin: "auto" }}>
          <div
            onClick={() => {
              if (logIn) {
                openCom(!makeCom);
              } else {
                history.push("/login");
              }
            }}
          >
            <span style={{ fontSize: "20px" }}>
              <i
                style={{ margin: "5px", cursor: "pointer" }}
                className="comment alternate outline icon"
              ></i>
            </span>
          </div>
          {makeCom && (
            <Form onSubmit={(e) => addComment(e)}>
              {" "}
              <Card>
                <TextArea
                  name="text"
                  rows={2}
                  placeholder="Comment here..."
                  required
                  onChange={formHandler}
                />
                <Button
                  style={{ marginTop: "5px" }}
                  basic
                  color="blue"
                  type="submit"
                >
                  Add Comment
                </Button>
              </Card>
            </Form>
          )}
        </div>
      }
    >
      <Popup.Header>Click here to comment</Popup.Header>
    </Popup>
  );
}
