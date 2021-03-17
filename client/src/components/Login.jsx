import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  Button,
  Header,
  Container,
  Grid,
  Image,
} from "semantic-ui-react";

toast.configure();
export default function Login() {
  const dispatch = useDispatch();
  const notify = () => {
    toast.success("You are successfully Logged in!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyError = () => {
    toast.error("Either your password or username is wrong!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  // const login = useSelector((state) => state.username);
  //const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

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
                    src="./illustrations/login.svg"
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
            <div style={{ width: "300px", margin: "auto", marginTop: "40px" }}>
              <Header size="large" style={{ margin: "auto", padding: "10px" }}>
                Login
              </Header>
              <Form
                style={{ margin: "auto" }}
                onSubmit={handleSubmit(() => {
                  //e.preventDefault();

                  console.log("Login Request!");
                  fetch("/login", {
                    method: "POST",
                    body: JSON.stringify(loginData),
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  })
                    .then((response) => {
                      history.push("/");
                      if (response.status === 200) {
                        response.json().then((data) => {
                          dispatch(userLogin(data));
                          if (data.logIn === true) {
                            sessionStorage.setItem("email", data.email);
                            //successfully login
                            notify();
                          } else {
                            //you have an error
                            notifyError();
                            history.push("/login");
                          }
                        });
                      } else {
                        //
                      }
                    })
                    .catch((err) => console.log(err));
                })}
              >
                <Form.Field>
                  <label htmlFor="username">Username</label>
                  <input
                    variant="outlined"
                    label="username"
                    type="text"
                    name="username"
                    size="small"
                    //id="username"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    ref={register({
                      required: true,
                      maxLength: 15,
                      minLength: 3,
                    })}
                  />
                </Form.Field>
                {errors.username && errors.username.type === "required" && (
                  <span className="errorsMsg">Your Username is required</span>
                )}
                {errors.userName && errors.userName.type === "maxLength" && (
                  <span>Max length exceeded</span>
                )}
                {errors.userName && errors.userName.type === "minLength" && (
                  <span className="errorsMsg">
                    Must be more than 3 character
                  </span>
                )}
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    // id="password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    ref={register({
                      required: true,
                      maxLength: 15,
                      minLength: 3,
                    })}
                  />
                </Form.Field>
                {errors.password && errors.password.type === "required" && (
                  <span className="errorsMsg">Your Password is required</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <span className="errorsMsg">Max length exceeded</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="errorsMsg">
                    Must be more than 3 character
                  </span>
                )}
                <Button
                  style={{
                    width: "150px",
                    marginBottom: "20px",
                    backgroundColor: "var(--yellow-light)",
                  }}
                  className="ui labeled icon button"
                  type="submit"
                >
                  {" "}
                  <i className="unlock alternate icon"></i>Login
                </Button>
              </Form>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
