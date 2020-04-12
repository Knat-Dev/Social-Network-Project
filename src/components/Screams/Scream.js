import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: "2rem",
  },
  link: {
    textDecoration: "none",
  },
  image: {
    minWidth: 200,
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  displayName: {
    flexGrow: 1,
  },
  body: {
    paddingLeft: theme.spacing(2),
  },
}));

export default function Scream({
  scream: {
    screamId,
    userImage,
    displayName,
    body,
    createdAt,
    likeCount,
    commentCount,
  },
}) {
  dayjs.extend(relativeTime);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent style={{ width: "100%" }}>
        <div className={classes.row}>
          <Avatar
            className={classes.avatar}
            alt={displayName}
            src={userImage}
          />

          <Typography
            className={classes.link + " " + classes.displayName}
            variant="h5"
            component={Link}
            to={`/users/${displayName}`}
            color="primary"
          >
            {displayName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </div>
        <Typography variant="body1" className={classes.body}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
