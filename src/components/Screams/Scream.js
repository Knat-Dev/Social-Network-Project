import React from 'react';
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
import TooltipButton from '../util/TooltipButton';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteScream from './DeleteScream';

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

  const like = () => {
    likeScream(screamId);
  };

  const unlike = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <TooltipButton tip="Like" to="/login" badgeContent={likeCount}>
      <FavoriteBorder color="primary" />
    </TooltipButton>
  ) : likedScream() ? (
    <TooltipButton tip="Unlike" badgeContent={likeCount} onClick={unlike}>
      <FavoriteIcon color="primary" />
    </TooltipButton>
  ) : (
    <TooltipButton tip="Like" badgeContent={likeCount} onClick={like}>
      <FavoriteBorder color="primary" />
    </TooltipButton>
  );

  const deleteScream = authenticated && displayName === authDisplayName && (
    <DeleteScream screamId={screamId} />
  );

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
          <Tooltip title="Comments">
            <IconButton>
              <Badge color={'secondary'} badgeContent={commentCount}>
                <ChatIcon color={'primary'} />
              </Badge>
            </IconButton>
          </Tooltip>
          {likeButton}
        </div>
        {deleteScream}
      </CardActions>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);
