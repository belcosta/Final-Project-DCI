import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { Button, Container } from "semantic-ui-react";

export default function DisplayComments({ comments, displayCom, showComm }) {
  const [commentsArray, setCommentsArray] = useState(comments);

  const update = useSelector((state) => state.update);

  useEffect(() => {
    let arrayReversed = comments.reverse();
    setCommentsArray(arrayReversed);
  }, [update, showComm, comments]);

  return (
    <Container>
      <span>
        {
          <Fragment>
            <Button
              style={{
                marginTop: "15px",
                backgroundColor: "var(--yellow-light)",
              }}
              onClick={() => {
                showComm(!displayCom);
              }}
            >
              {parseInt(comments.length)} Comments{" "}
            </Button>
          </Fragment>
        }
      </span>
      <Container
        style={{
          overflow: "scroll",
          maxHeight: "180px",
          width: "600px",
          scrollBehavior: "smooth",
          marginTop: "15px",
        }}
      >
        {displayCom && (
          <Fragment>
            {commentsArray.map((comment) => (
              <Comment key={comment._id} data={comment}></Comment>
            ))}
          </Fragment>
        )}
      </Container>
    </Container>
  );
}
