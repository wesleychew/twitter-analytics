import React, { useState, useEffect, Fragment } from "react";
import SearchAppBar from "./SearchAppBar";
import Typography from "@material-ui/core/Typography";
import { TextField, Grid, Container } from "@material-ui/core";
import "../App.css";
const axios = require("axios");

const style = {
  GridTop: {
    paddingTop: 48
  },
  Grid: {
    paddingTop: 8,
    paddingBottom: 4
  }
};

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("/wake/")
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  return (
    <Fragment>
      <SearchAppBar />
      <Container maxWidth="md">
        <Grid style={style.GridTop}>
          <Typography variant="h4">
            See statistics of your twitter account
          </Typography>
        </Grid>
        <Grid style={style.Grid}>
          <p>
            Enter a username below to analyze their full profile and statistics
            - recent activity patterns, geolocation prediction, text analysis,
            wordcloud and more interesting stats. Data is scrapped from the last
            200 tweets.
          </p>
        </Grid>
        <Grid style={style.Grid}>
          <p>
            <b>Enter a twitter username below </b>
          </p>

          <form action={"/user/" + username}>
            <TextField
              type="text"
              value={username}
              onChange={handleUsernameChange}
            ></TextField>
          </form>
          <p>Data takes around 30 seconds to fetch and process.</p>
        </Grid>
      </Container>
      <div className="Footer">
        <Container maxWidth="md">
          <Grid style={style.Grid}>
            <h2>Folloing - A twitter user analysis site</h2>
            <p>
              Folloing gets the information as well as a list of the last 200
              tweets of a twitter account and visually shows the user's activity
              patterns and statistics. It also analyze the tweet's contents and
              tell you about topics usage in form of "word clouds" so that you
              can easily understand which words are the most popular. Using
              machine learning methods, we predict which region as well as the
              country they might be from and the sentiment score of their
              tweets.
            </p>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}

export default Home;
