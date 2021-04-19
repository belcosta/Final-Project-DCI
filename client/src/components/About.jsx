import React from "react";
import {
  Image,
  Grid,
  Header,
  Divider,
  Icon,
  Item,
  Container,
} from "semantic-ui-react";
import "./About.css";
import { Spring } from "react-spring/renderprops";

function About() {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ delay: 80, duration: 800 }}
    >
      {(props) => (
        <div style={props} className="about">
          <div>
            <Image style={{ height: "50vh" }} src="/images/banner.png" fluid />
          </div>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column mobile={15} tablet={4} computer={6}>
                <Image
                  wrapped
                  style={{
                    height: "50vh",
                    margin: "auto",
                    marginLeft: "25%",
                    marginTop: "80px",
                    borderRadius: "5px",
                  }}
                  src="/images/graduation.svg"
                />
              </Grid.Column>
              <Grid.Column
                mobile={14}
                tablet={12}
                computer={8}
                style={{
                  marginTop: "40px",
                  color: "whitesmoke",
                  margin: "auto",
                }}
              >
                <Header style={{ textAlign: "center", color: "white" }}>
                  About
                </Header>
                <Divider hidden />
                Studying and learning about Web Development can be difficult and
                overwhelming, especially at the beginning. There is so much
                information about web development out there and it can be
                challenging to distinguish between the helpful and unhelpful
                resources on the internet.The Student Companion is a platform
                that allows web development students to search, find and
                exchange resources such as useful websites, tutorials, courses,
                blogs, videos, new libraries, and much more about coding and
                programming.
                <Divider hidden />
                We believe that everyone who starts coding and programming
                should have access to a platform that provides reliable guidance
                and allows you to find the resources that are helpful for you.
                This is why we decided to build a new and unique platform that
                gives the current and future students at the DCI the tools to
                inform and educate themselves further according to the
                curriculum of the DCI.
                <Divider hidden />
                At The Student Companion, we are dedicated to making life easy
                for future web developers and our goal is to change the way that
                students at the Digital Career Institute exchange experiences,
                communicate, and collaborate with each other. With the Student
                Companion as our final project, we were given the opportunity to
                apply the skills we learned in the last year and the possibility
                to give something back to the DCI, something made by students
                for students.
                <Divider hidden />
                For the future, we hope that our community will contribute to
                the Student Companion to help us in our mission of becoming a
                platform where you can find all the useful and helpful
                information in just one place.
                <Divider hidden />
                <Divider style={{ color: "white" }} horizontal>
                  Technologies
                </Divider>
                <Grid>
                  <Grid.Row
                    style={{
                      margin: "20px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Image
                      style={{ width: "40px", height: "15vh" }}
                      src="/images/mongodb.png"
                    />
                    <Image
                      style={{ width: "90px" }}
                      src="/illustrations/express.png"
                    />
                    <Image style={{ width: "85px" }} src="/images/react.png" />

                    <Image
                      style={{ width: "75px" }}
                      src="/images/node-js.png"
                    />
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1} doubling padded>
            <Grid.Row>
              <Header
                size="large"
                style={{ color: "white", width: "270px", marginTop: "29px" }}
                as="h2"
                icon
                textAlign="center"
              >
                <Icon name="users" circular />
                <Header.Content>Our mission</Header.Content>
                <Header.Subheader style={{ color: " #f5f5f5" }}>
                  Gather DCI topics which are essential for student development
                  and effective studying
                </Header.Subheader>
              </Header>
              <Header
                size="large"
                style={{ color: "white", width: "270px" }}
                as="h2"
                icon
                textAlign="center"
              >
                <Icon name="hand peace outline" circular />
                <Header.Content>Our vibe</Header.Content>
                <Header.Subheader style={{ color: " #f5f5f5" }}>
                  We planned it, we dreamt it, and then we did it together every
                  day reinventing what's possible
                </Header.Subheader>
              </Header>
              <Header
                size="large"
                style={{ color: "white", width: "270px" }}
                as="h2"
                icon
                textAlign="center"
              >
                <Icon name="student" circular />
                <Header.Content>Our values</Header.Content>
                <Header.Subheader style={{ color: " #f5f5f5" }}>
                  Sharing knowledge, learning new topics, building trust with
                  constant improvement and last but not least making coding FUN!
                </Header.Subheader>
              </Header>
              <Grid.Column>
                <Image
                  style={{ width: "400px", margin: "auto" }}
                  src="/images/team.png"
                />
              </Grid.Column>
              <Grid
                style={{
                  justifyContent: "space-around",
                }}
                columns={1}
                doubling
                padded
              >
                <Grid.Row>
                  <Item>
                    <Image
                      style={{
                        objectFit: "cover",
                      }}
                      src="/images/Jose.jpg"
                      size="small"
                      circular
                      centered
                    />
                    <Header style={{ color: "white" }} textAlign="center">
                      Jose luis Salgado
                    </Header>
                    <Item
                      style={{ marginLeft: "35px" }}
                      as="a"
                      target="_blank"
                      href="https://github.com/joseluis2289/"
                    >
                      {" "}
                      <Icon name="github" size="large" />
                    </Item>
                    <Item
                      as="a"
                      target="_blank"
                      href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin"
                    >
                      <Icon name="linkedin" size="large" />
                    </Item>
                  </Item>
                  <Item>
                    <Image src="/images/bel.jpg" size="small" circular />
                    <Header style={{ color: "white" }} textAlign="center">
                      Isabel Costa
                    </Header>
                    <Item
                      style={{ marginLeft: "45px" }}
                      as="a"
                      target="_blank"
                      href="https://github.com/belcosta/"
                    >
                      <Icon name="github" size="large" />
                    </Item>
                    <Item
                      as="a"
                      target="_blank"
                      href="https://www.linkedin.com/in/belcosta-webdeveloper/?locale=en_US"
                    >
                      <Icon name="linkedin" size="large" />
                    </Item>
                  </Item>
                  <Item>
                    <Image
                      style={{ objectFit: "cover" }}
                      src="/images/christian.jpg"
                      size="small"
                      circular
                    />
                    <Header style={{ color: "white" }} textAlign="center">
                      Christian Heinrich
                    </Header>
                    <Item
                      style={{ marginLeft: "45px" }}
                      as="a"
                      target="_blank"
                      href="https://github.com/coffeerpyos"
                    >
                      <Icon name="github" size="large" />
                    </Item>
                    <Item
                      as="a"
                      target="_blank"
                      href="https://www.linkedin.com/in/christian-heinrich-39b91b14/"
                    >
                      <Icon name="linkedin" size="large" />
                    </Item>
                  </Item>
                </Grid.Row>
              </Grid>
            </Grid.Row>
          </Grid>
          <Container fluid style={{ backgroundColor: "#ffde59" }}>
            <Image
              style={{ margin: "auto", height: "50vh", objectFit: "fill" }}
              src="/images/footer.png"
            />
          </Container>
        </div>
      )}
    </Spring>
  );
}

export default About;
