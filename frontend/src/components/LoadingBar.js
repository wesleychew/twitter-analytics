import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function LoadingBar(props) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        const diff = props.interval;
        return Math.min(oldCompleted + diff, 100);
      });
    }
    const timer = setInterval(progress, props.progress);
    return () => {
      clearInterval(timer);
    };
  }, [props.interval, props.progress]);

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={completed}
        color={props.col}
      />
    </div>
  );
}
