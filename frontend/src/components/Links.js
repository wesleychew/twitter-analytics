/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(3)
    },
    marginRight: 36
  }
}));

export default function Links() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link href="/" color="inherit" underline="none">
        Home
      </Link>
      <Link href="/about" color="inherit" underline="none">
        About
      </Link>
    </Typography>
  );
}
