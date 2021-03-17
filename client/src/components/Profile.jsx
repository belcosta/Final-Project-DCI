import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { updateUser, userLogout } from "../redux/actions";
import {
  Form,
  Button,
  Header,
  Grid,
  Image,
  Container,
} from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import ModalBox from "./ModalBox";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [updateData, setUpdateData] = useState(user);
  const notify = () => {
    toast.success(`Successfully Updated!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const notifyError = () => {
    toast.error("Error to Update profile!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const { register, handleSubmit, errors } = useForm();
  const profileHandler = (e) => {
    //console.log(e);
    e.preventDefault();
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  //GET DATA TO DISPLAY
  useEffect(() => {
    fetch("/profile")
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            setUpdateData({ ...data, password: "password" });
          });
        } else {
          // connection is lost
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const updateHandler = (e) => {
    axios({
      method: "PUT",
      url: `/update`,
      data: updateData,
    })
      .then((response) => {
        console.log("what came?", response);
        notify();
        setUpdateData({ ...response.data, password: updateData.password });
        dispatch(updateUser(response.data));
        history.push("/");
      })
      .catch((err) => {
        notifyError();
        console.error("Error to update", err);
      });
  };
  const delProfile = () => {
    axios({
      method: "DELETE",
      url: `delete/${user._id}`,
    })
      .then((res) => {
        history.push("/");
        dispatch(userLogout());
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container fluid>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column
            verticalAlign="middle"
            mobile={16}
            tablet={16}
            computer={9}
            className="background-container"
            style={{
              padding: "0 !important",
              margin: "0",
            }}
          >
            {/* styling colored background + image depending on the screen width  */}
            <Grid divided="vertically" verticalAlign="middle">
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={6} computer={16}>
                  <Header
                    textAlign="center"
                    style={{
                      fontSize: "1.5rem",
                      margin: "1em",
                    }}
                  >
                    How nice! You are here =)
                  </Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={10} computer={16}>
                  <Image
                    wrapped
                    src="./illustrations/profile.svg"
                    alt="man on computer"
                    style={{
                      padding: "1.5rem",
                      margin: "0",
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column
            className="add-form"
            verticalAlign="middle"
            mobile={16}
            tablet={16}
            computer={7}
          >
            <Container
              style={{ width: "300px", margin: "auto", marginTop: "40px" }}
              className="intro-text"
            >
              <Header size="large" style={{ margin: "auto", padding: "10px" }}>
                Profile Update
              </Header>
              <Form
                style={{ margin: "auto" }}
                onSubmit={handleSubmit((e) => {
                  updateHandler(e);
                })}
              >
                <Form.Field>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={updateData.name}
                    onChange={(e) => {
                      profileHandler(e);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    name="userName"
                    id="username"
                    value={updateData.userName}
                    onChange={profileHandler}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={updateData.email}
                    onChange={profileHandler}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Enter new password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    //value={updateData.password}
                    onChange={profileHandler}
                    ref={register({
                      required: true,
                      maxLength: 15,
                      minLength: 3,
                    })}
                  />
                </Form.Field>
                {errors.password && errors.password.type === "maxLength" && (
                  <span className="errorsMsg">Max length exceeded</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="errorsMsg">
                    Must be more than 3 character
                  </span>
                )}
                <Form.Field>
                  <label htmlFor="confirm-password">Confirm new Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    onChange={profileHandler}
                    ref={register({
                      required: true,
                      maxLength: 15,
                      minLength: 3,
                    })}
                  />
                </Form.Field>
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <span className="errorsMsg">
                      Please confirm your password
                    </span>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "maxLength" && (
                    <span className="errorsMsg">Max length exceeded</span>
                  )}
                <Button
                  style={{ width: "130px", alignItems: "center" }}
                  className="ui primary labeled icon button"
                  type="submit"
                >
                  <i className="edit icon"></i>Update
                </Button>
                <Button
                  style={{
                    width: "130px",
                    alignItems: "center",
                    marginBottom: "1em",
                  }}
                  className="ui red labeled icon button"
                  onClick={() => setDeleteModal(true)}
                >
                  <i className="trash alternate outline icon"></i>Delete
                </Button>
              </Form>
            </Container>
            {/* MODAL TO DELETE */}
            <ModalBox
              header="Delete Profile"
              text=" Would you like to delete your profile permanently? This action can
                not be undone."
              action={delProfile}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
