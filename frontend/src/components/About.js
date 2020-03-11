import React, { Fragment } from "react";
import SearchAppBar from "./SearchAppBar";
import { Grid, Container } from "@material-ui/core";
import "../App.css";

function About() {
  const style = {
    Grid: {
      paddingTop: 24,
      paddingBottom: 24
    },
    Tag: {}
  };
  return (
    <Fragment>
      <SearchAppBar />
      <Container maxWidth="md">
        <Grid style={style.Grid}>
          <h1>About</h1>
          <p>
            Folloing is a General Assembly Data Science Immersive capstone
            project
          </p>
        </Grid>
        <Grid style={style.Grid}>
          <h1>Stack</h1>
          <p>
            Natural Language Processing using Python NLTK and{" "}
            <a
              href="https://pypi.org/project/vaderSentiment/"
              rel="noopener noreferrer"
            >
              Vader Sentiment
            </a>
          </p>
          <p>
            Region and Country Prediction using python{" "}
            <a
              href="https://scikit-learn.org/stable/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sk-learn
            </a>{" "}
            and{" "}
            <a
              href="https://keras.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Keras
            </a>
          </p>
          <p>
            Frontend with{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>{" "}
            and{" "}
            <a
              href="https://material-ui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Material-UI
            </a>
          </p>
          <p>
            Data Visualization using{" "}
            <a
              href="http://recharts.org/en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recharts
            </a>
          </p>
          <p>
            Twitter data scrapped using{" "}
            <a
              href="https://github.com/twintproject/twint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twint
            </a>
          </p>
          <p>
            <a
              href="https://pgjones.gitlab.io/quart/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quart
            </a>{" "}
            backend framework, hosted on{" "}
            <a
              href="https://www.heroku.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Heroku
            </a>
          </p>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default About;
