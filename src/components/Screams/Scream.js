import React, { useEffect } from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActions,
  IconButton,
  CardActionArea,
  Tooltip,
  Badge,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// Icons
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import SocialButtons from './SocialButtons';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
  image: {
    minWidth: 200,
  },
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
}));

function Scream({
  likeScream,
  unlikeScream,
  user: {
    likes,
    authenticated,
    credentials: { displayName: authDisplayName },
  },
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

  const likedScream = () => {
    return likes && likes.find((like) => screamId === like.screamId);
  };

  const deleteScream = authenticated && displayName === authDisplayName && (
    <DeleteScream screamId={screamId} />
  );

  useEffect(() => {
    console.log(commentCount);
  }, [commentCount]);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent style={{ width: '100%', wordWrap: 'break-word' }}>
          <div className={classes.row}>
            <Avatar
              className={classes.avatar}
              alt={displayName}
              src={userImage}
            />

            <div className={classes.displayName}>
              <Typography
                className={classes.link}
                variant="h5"
                component={Link}
                to={`/users/${displayName}`}
                color="primary"
              >
                {displayName}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          </div>
          <Typography variant="body1" className={classes.body}>
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.grow}>
          <SocialButtons
            screamId={screamId}
            likeCount={likeCount}
            likedScream={likedScream}
            commentCount={commentCount}
          />
        </div>
        {deleteScream}
        <ScreamDialog
          screamId={screamId}
          displayName={displayName}
          likedScream={likedScream}
          commentCount={commentCount}
        />
      </CardActions>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);
