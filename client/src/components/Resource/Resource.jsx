import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import CreateComment from "./CreateComment.jsx";
import DisplayComments from "./DisplayComments";
import Options from "./Options";
import {
  Card,
  CardContent,
  CardHeader,
  Image,
  Grid,
  GridRow,
  GridColumn,
  CardMeta,
  Item,
  CardDescription,
  Label,
  Icon,
} from "semantic-ui-react";
import "./resource.css";

// Gets reference ID as props.data.id
const Resource = (props) => {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const update = useSelector((state) => state.update);
  const [makeCom, setMakeComm] = useState(false);
  const [displayCom, setDisplayComm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );
  //create function to allow the child component "CreateComment" to change "displayCom" state
  function showMakeComm(newValue) {
    setMakeComm(newValue);
  }
  function showComm(newValue) {
    setDisplayComm(newValue);
  }

  useEffect(() => {
    props.data.previewImage && setPreviewUrl(props.data.previewImage);
  }, [props.data.previewImage, update]);

  return (
    <Card.Group style={{ margin: "10px" }} className="ui container">
      <Card
        style={{
          width: "600px",
          backgroundColor: "#706FCD",
          height: "fit-content",
        }}
      >
        <CardContent>
          <Card.Header
            style={{ color: "white", padding: "10px", textAlign: "center" }}
          >
            {props.data.title}
          </Card.Header>
        </CardContent>
        <Card
          style={{
            width: "550px",
            margin: "auto",
            height: "fit-content",
            bottom: "15px",
          }}
        >
          <CardContent>
            <Grid>
              <GridRow>
                <Grid.Column width={13}>
                  <Rating
                    rating={props.data.rating}
                    num_ratings={props.data.num_ratings}
                    resourceId={props.data._id}
                    size="large"
                    icon="star"
                    defaultRating={5}
                    maxRating={5}
                  />
                </Grid.Column>
                <Options
                  width={3}
                  style={{
                    margin: "10px",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                  floated="right"
                  size="mini"
                  resource={props.data}
                />
              </GridRow>
            </Grid>
            <Grid>
              <GridRow
                style={{
                  padding: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardMeta>
                  {" "}
                  {props.data.category.map((item, index) => {
                    let name = item[0].toUpperCase() + item.substring(1);
                    return (
                      <Label key={index} className={`label-${item}`}>
                        {name}
                      </Label>
                    );
                  })}
                </CardMeta>
                <Item floated="right" size="mini">
                  {props.data.paid ? (
                    <span>
                      Paid <Icon name="dollar sign" color="green" />
                    </span>
                  ) : (
                    <span>
                      Free <Icon name="checkmark" color="green" />
                    </span>
                  )}
                </Item>
              </GridRow>
            </Grid>

            <GridColumn>
              <Image
                src={previewUrl}
                alt="Illustration for Online Learning"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                  width: "400px",
                  borderRadius: "20px",
                  margin: "auto",
                  padding: "10px",
                }}
                size="medium"
              />
              <Grid>
                <GridRow
                  style={{
                    padding: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Label
                    as="a"
                    color="blue"
                    href={`${props.data.link}`}
                    target="_blank"
                  >
                    <Icon name="linkify" />
                    <Label.Detail style={{ fontSize: "1.2rem" }}>
                      Go to original Page{" "}
                    </Label.Detail>
                  </Label>
                </GridRow>
                <CardDescription style={{ margin: "10px" }}>
                  {props.data.description}
                </CardDescription>

                <DisplayComments
                  comments={props.data.comments}
                  displayCom={displayCom}
                  showComm={showComm}
                />

                <CreateComment
                  resourceId={props.data._id}
                  makeCom={makeCom}
                  showComm={showComm}
                  showMakeComm={showMakeComm}
                />
              </Grid>
            </GridColumn>
          </CardContent>
        </Card>
      </Card>
    </Card.Group>
  );
};

export default Resource;
