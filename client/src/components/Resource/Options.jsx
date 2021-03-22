import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData } from "../../redux/actions";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Modal,
  Form,
  Radio,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ModalBox from "../ModalBox";

export default function Options({ resource }) {
  const user = useSelector((state) => state.user);
  const logIn = useSelector((state) => state.logIn);
  const [resourceData, setResourceData] = useState(resource);
  const update = useSelector((state) => state.update);
  //modal to delete
  const [deleteModal, setDeleteModal] = useState(false);
  //modals to report
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [reasonForReport, setReasonForReport] = useState("");

  //function to future implementation
  const handleChange = (e, { value }) => setReasonForReport(value);

  const dispatch = useDispatch();
  const history = useHistory();

  //alert to confirm that link was copied
  const notify = (txt) => {
    toast.success(`${txt}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  //setting function depending on which link from dropdown was clicked
  const handle = (e, value) => {
    console.log("handle", e.target);
    if (value === "edit") {
      history.push(`/update_resource/${resource._id}`);
    }
    if (value === "delete") {
      setDeleteModal(true);
    }
    if (value === "share") {
      var url = `${resource.link}`;
      navigator.clipboard.writeText(url);
      notify("The link was copied!");
    }

    //updating property "reported" to true
    if (value === "report") {
      if (logIn) {
        setFirstOpen(true);
        setResourceData({ ...resource, reported: true });
      } else {
        notify("you need to log in first");
        history.push("/login");
      }
    }
  };

  //function to from report
  const report = (e) => {
    e.preventDefault();
    setResourceData({ ...resource, reported: true });
    axios({
      method: "PUT",
      url: `/resources/${resource._id}`,
      ContentType: "application/json; charset=utf-8",
      data: resourceData,
    })
      .then(function (response) {
        dispatch(updateData(update));
        setFirstOpen(false);
        setSecondOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const delResource = (e) => {
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `/resources/${resource._id}`,
      ContentType: "application/json; charset=utf-8",
    })
      .then((response) => {
        dispatch(updateData(update));
        setDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Dropdown
        //text="..."
        pointing="right"
        className="link item"
        style={{
          backgroundColor: "var(--yellow-light)",
          padding: "0.5rem",
          borderRadius: "10px",
          marginLeft: "15px",
          marginTop: "15px",
        }}
      >
        {user._id !== resource.user._id ? (
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => handle(e, "share")}>
              <Icon name="share"></Icon>Copy link
            </Dropdown.Item>

            <Dropdown.Item onClick={(e) => handle(e, "report")}>
              {" "}
              <Icon name="attention"></Icon>Report
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => handle(e, "share")}>
              <Icon name="share"></Icon>Copy link
            </Dropdown.Item>

            <Dropdown.Item onClick={(e) => handle(e, "report")}>
              {" "}
              <Icon name="attention"></Icon>Report
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => handle(e, "edit")}>
              <Icon name="edit"></Icon>Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => handle(e, "delete")}>
              <Icon name="trash alternate outline"></Icon>Remove Post
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>

      <ModalBox
        header="Delete Resource"
        text="Would you like to delete this resource permanently? This action can
            not be undone."
        action={delResource}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      {/* MODAL TO REPORT */}
      {/* 2 modals  */}
      <Modal
        size="mini"
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Header icon="attention" content="Report Content" />
        <Modal.Content>
          <Form>
            <Form.Field>Why do you want to report this resource?</Form.Field>
            <Form.Field>
              <Radio
                label="inappropriate content"
                name="radioGroup"
                value="inappropriate-content"
                checked={reasonForReport === "inappropriate-content"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="repeated"
                name="radioGroup"
                value="repeated"
                checked={reasonForReport === "repeated"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="other reason"
                name="radioGroup"
                value="other"
                checked={reasonForReport === "other"}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setFirstOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="green"
            onClick={(e) => {
              /* setFirstOpen(false); */
              setSecondOpen(true);
            }}
          >
            Send <Icon name="checkmark" />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => {
            setSecondOpen(false);
          }}
          open={secondOpen}
          size="small"
        >
          <Modal.Header>Thanks for your help</Modal.Header>
          <Modal.Content>
            <p>Our moderators will check this report.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              icon="check"
              content="Close"
              onClick={() => {
                axios({
                  method: "PUT",
                  url: `/resources/${resource._id}`,
                  ContentType: "application/json; charset=utf-8",
                  data: resourceData,
                })
                  .then(function (response) {
                    dispatch(updateData(update));
                    setSecondOpen(false);
                    setFirstOpen(false);
                    history.push("/home");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </div>
  );
}
