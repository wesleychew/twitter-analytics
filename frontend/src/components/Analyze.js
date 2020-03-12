import React, { useState, useEffect, Fragment } from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import StickyHeadTable from "./StickyHeadTable";
import LineGraph from "./LineGraph";
import BubbleGraph from "./BubbleGraph";
import ReactWordcloud from "react-wordcloud";
import SentimentGraph from "./SentimentGraph";
import LoadingBar from "./LoadingBar";
import SearchAppBar from "./SearchAppBar";
import HorizontalGraph from "./HorizontalGraph";
import ScatterGraph from "./ScatterGraph";
import Tooltip from "@material-ui/core/Tooltip";
import "../App.css";

const axios = require("axios");

const style = {
  GridTop: {
    paddingTop: 24
  },
  Grid: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20
  },
  GridGraph: {
    paddingRight: 28
  },
  Image: {
    height: "auto",
    width: "100px",
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: "24px"
  },
  MentionImage: {
    width: "64px",
    borderRadius: "24px",
    marginRight: "4px"
  },
  UrlImage: {
    width: "48px",
    borderRadius: "12px",
    marginRight: "4px"
  },
  MainName: {
    color: "#0FACF3",
    fontSize: "32px",
    textDecoration: "None"
  },
  DateLabel: {
    color: "#555"
  },
  InfoHeader: {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    marginTop: 16,
    backgroundColor: "#999",
    color: "#ffffff"
  },
  Box: {
    border: "solid",
    borderColor: "#999",
    borderWidth: "2px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px"
  }
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurdsay",
  "Friday",
  "Saturday",
  "Sunday"
];

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Analyze(props) {
  const [status, setStatus] = useState("Fetching tweets...");
  const [fetching, setFetching] = useState(true);
  const [vaildAccount, setVaildAccount] = useState(true);
  const [message, setMessage] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [hourGraph, setHourGraph] = useState([]);
  const [monthGraph, setMonthGraph] = useState([]);
  const [dayGraph, setDayGraph] = useState([]);
  const [dayTimeGraph, setDayTimeGraph] = useState([]);
  const [regionGraph, setRegionGraph] = useState([]);
  const [countryGraph, setCountryGraph] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [words, setWords] = useState([]);
  const [sentimentGraph, setSentimentGraph] = useState([]);
  const [hmuGraph, setHmuGraph] = useState([]);
  const [logScale, setLogScale] = useState([]);
  const [hashtagGraph, setHashtagGraph] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios
      .get("/api/", {
        params: { username: props.match.params.username }
      })
      .then(res => {
        setFetching(false);
        setStatus(
          "Finished fetching " +
            res.data.info.username +
            " tweets. Took " +
            res.data.took.toLocaleString() +
            " seconds. Processing Data..."
        );

        axios
          .post("/analyze/", res.data)
          .then(function(response) {
            console.log(response.data);
            setVaildAccount(response.data.vaildAccount);
            setMessage(response.data);
            setMonth(response.data.month);
            setYear(response.data.year);
            setHourGraph(response.data.hourGraph);
            setMonthGraph(response.data.monthGraph);
            setDayGraph(response.data.dayGraph);
            setDayTimeGraph(response.data.dayTimeGraph);
            setRegionGraph(response.data.regionProba);
            setCountryGraph(response.data.countryProba);
            setCountry(response.data.country);
            setRegion(response.data.region);
            setWords(response.data.wordcloud);
            setSentimentGraph(response.data.sentimentGraph);
            setHmuGraph(response.data.hmuGraph);
            setHashtagGraph(response.data.hashtagGraph);
            setLogScale(response.data.logScale);
            setMentions(response.data.mentions);
            setUrls(response.data.urls);
            setPageLoading(false);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.username]);

  return (
    <div>
      {pageLoading ? (
        <Fragment>
          <SearchAppBar />
          {fetching ? (
            <div>
              <LoadingBar interval={1} progress={300} col={"primary"} />
              <p style={{ marginLeft: 12 }}>
                Fetching tweets... If page is not loaded after loading bar
                reaches the end, it means website is experiencing high traffic
                and needs to be reloaded.
              </p>
            </div>
          ) : (
            <div></div>
          )}
          {fetching ? (
            <div></div>
          ) : (
            <div>
              <LoadingBar interval={25} progress={400} col={"primary"} />
              <p style={{ marginLeft: 12 }}>{status}</p>
            </div>
          )}
        </Fragment>
      ) : (
        <div>
          <SearchAppBar />
          {vaildAccount ? (
            <div>
              <Container maxWidth="lg">
                <Grid style={style.GridTop}>
                  <img src={message.info.avatar} style={style.Image} alt="" />
                </Grid>
                <Grid container justify="center" style={style.Grid}>
                  <a
                    href={"https://twitter.com/" + message.info.username}
                    style={style.MainName}
                  >
                    {"@ " + message.info.name}
                  </a>
                </Grid>
                <Grid container justify="center" style={style.Grid}>
                  <Typography variant="caption" style={style.DateLabel}>
                    On twitter for {year} year {month} month(s)
                  </Typography>
                </Grid>

                <Grid container justify="center" style={style.InfoHeader}>
                  <Typography>ACTIVITY PATTERN</Typography>
                </Grid>
                <Grid container style={style.Box}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.GridGraph}
                    container
                    justify="center"
                  >
                    <h2>Tweets and Replies over time</h2>
                    <LineGraph data={monthGraph}></LineGraph>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.GridGraph}
                    container
                    justify="center"
                  >
                    <h2>Tweets by hour of Day</h2>
                    <BarGraph data={hourGraph}></BarGraph>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.GridGraph}
                    container
                    justify="center"
                  >
                    <h2>Tweets by weekday</h2>
                    <BarGraph data={dayGraph}></BarGraph>
                  </Grid>
                  <Grid item xs={12} sm={6} style={style.Grid}>
                    <h2 style={{ textAlign: "center" }}>Activity heatmap</h2>
                    {dayTimeGraph.map(function(day, i) {
                      return <BubbleGraph key={i} data={day} day={days[i]} />;
                    })}
                  </Grid>
                </Grid>
                <br></br>
                <Grid container justify="center" style={style.InfoHeader}>
                  <Typography>BASIC INFORMATION</Typography>
                </Grid>
                <Grid container style={style.Box}>
                  <Grid item xs={12} sm={7} style={style.Grid}>
                    <h2>About</h2>
                    <Grid container>
                      <Grid item xs={4} sm={3}>
                        <p>Username</p>
                        <p>Location</p>
                        <p>Website</p>
                        <p>Bio</p>
                      </Grid>
                      <Grid item xs={8} sm={9}>
                        <p>{message.info.username}</p>
                        <p>{message.info.location}</p>
                        <a
                          href={message.info.url}
                          style={{ textDecoration: "None", color: "#0FACF3" }}
                        >
                          {message.info.url.replace(
                            /^(?:https?:\/\/)?(?:www\.)?/i,
                            ""
                          )}
                        </a>
                        <p>{message.info.bio}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={5} style={style.Grid}>
                    <h2>statistics</h2>
                    <Grid container>
                      <Grid item xs={6}>
                        <p>Join Date</p>
                        <p>Tweet Count</p>
                        <p>Following</p>
                        <p>Followers</p>
                        <p>Followers Ratio </p>
                      </Grid>
                      <Grid item xs={6}>
                        <p>{message.info.join_date}</p>
                        <p>{message.info.tweets.toLocaleString()}</p>

                        <p>{message.info.following.toLocaleString()}</p>
                        <p>{message.info.followers.toLocaleString()}</p>
                        <p>
                          {(
                            message.info.followers / message.info.following
                          ).toLocaleString()}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <br></br>

                <Grid container justify="center" style={style.InfoHeader}>
                  <Typography>REGION & COUNTRY PREDICTION</Typography>
                </Grid>
                <Grid container style={style.Box}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.Grid}
                    container
                    justify="center"
                  >
                    <h2>Region probability</h2>
                    <BarGraph data={regionGraph} domain={[0, 1]}></BarGraph>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.Grid}
                    container
                    justify="center"
                  >
                    <h2>country prediction</h2>
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <PieGraph data={countryGraph} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <p>
                          <br></br>
                          {message.info.username} is predicted to be from{" "}
                          <u>
                            <b>{Capitalize(region)}</b>
                          </u>{" "}
                          region based on his/her activity patterns. By
                          inferring their tweet text, {message.info.username} is
                          predicted to be from{" "}
                          <u>
                            <b>{Capitalize(country)}</b>
                          </u>
                          . Results were gathered through machine learning
                          methods and natural language processing. Take this
                          with a grain of salt.
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <br></br>

                <Grid container justify="center" style={style.InfoHeader}>
                  <Typography>TEXT ANALYSIS</Typography>
                </Grid>
                <Grid container style={style.Box}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ paddingTop: 24 }}
                    container
                    justify="center"
                  >
                    <h2 style={{ marginTop: 12, marginBottom: 8 }}>
                      Word Cloud
                    </h2>
                    <ReactWordcloud
                      words={words}
                      options={{
                        rotations: 2,
                        fontSizes: [20, 100],
                        rotationAngles: [0, 90]
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                      paddingTop: 24,
                      paddingRight: 16,
                      paddingBottom: 24
                    }}
                    container
                    justify="center"
                  >
                    <h2 style={{ marginTop: 12, marginBottom: 8 }}>
                      Word Frequency Table
                    </h2>
                    <StickyHeadTable words={words} />
                  </Grid>
                  <br></br>
                  <Grid item xs={12} sm={12} container justify="center">
                    <h2>Tweets Sentiment</h2>
                    <SentimentGraph data={sentimentGraph}></SentimentGraph>
                  </Grid>
                </Grid>
                <br></br>

                <Grid container justify="center" style={style.InfoHeader}>
                  <Typography>HASHTAGS & MENTIONS & URLS</Typography>
                </Grid>
                <Grid container style={style.Box}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.Grid}
                    container
                    justify="center"
                  >
                    <h2>Hashtags mentions url propotion</h2>
                    <HorizontalGraph data={hmuGraph}></HorizontalGraph>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={style.Grid}
                    container
                    justify="center"
                  >
                    <h2>Hashtags</h2>
                    <ScatterGraph
                      data={hashtagGraph}
                      log={logScale}
                    ></ScatterGraph>
                  </Grid>

                  <Grid item xs={12} sm={6} style={style.Grid}>
                    <Grid
                      style={{ marginBottom: 12 }}
                      container
                      justify="center"
                    >
                      <h2>Top Mentions</h2>
                    </Grid>

                    {mentions.map((item, i) => (
                      <Tooltip
                        key={i}
                        title={
                          <span style={{ fontSize: 12 }}>
                            {"@" +
                              item[0] +
                              " / " +
                              "mentioned " +
                              item[1] +
                              " time(s)"}
                          </span>
                        }
                        arrow
                      >
                        <a key={i} href={"/user/" + item[0]}>
                          <img
                            src={"https://twitter-avatar.now.sh/" + item[0]}
                            style={style.MentionImage}
                            alt=""
                            onError={i => (i.target.style.display = "none")}
                          />
                        </a>
                      </Tooltip>
                    ))}
                  </Grid>
                  <Grid item xs={12} sm={6} style={style.Grid}>
                    <Grid
                      style={{ marginBottom: 12 }}
                      container
                      justify="center"
                    >
                      <h2>Top urls</h2>
                    </Grid>

                    {urls.map((item, i) => (
                      <Tooltip
                        key={i}
                        title={
                          <span style={{ fontSize: 12 }}>
                            {item[0] + " / linked " + item[2] + " time(s)"}
                          </span>
                        }
                        arrow
                      >
                        <a
                          key={i}
                          href={item[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={item[1]}
                            style={style.UrlImage}
                            onError={i => (i.target.style.display = "none")}
                            alt=""
                          />
                        </a>
                      </Tooltip>
                    ))}
                  </Grid>
                </Grid>
                <br></br>
              </Container>
            </div>
          ) : (
            <div>
              <p style={{ marginLeft: 12 }}>
                Account is private or does not exist.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Analyze;
