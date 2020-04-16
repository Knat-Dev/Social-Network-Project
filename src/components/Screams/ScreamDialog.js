import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  IconButton,
  Typography,
  Divider,
  CircularProgress,
  DialogActions,
  Tooltip,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import TooltipButton from '../util/TooltipButton';
import SocialButtons from './SocialButtons';
import Comments from './Comments';
import CommentForm from './CommentForm';
const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxWidth: '100%',
    borderRadius: '50%',
  },
  title: {
    color: 'white',
    background: theme.palette.primary.main,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
  invisibleSeperator: {
    margin: '0.5rem 0',
    border: 'none',
  },
  dialogContent: {
    padding: '20px',
    marginTop: '1rem',
  },
  progress: {
    margin: '0 auto',
  },
  flex: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '26px 0',
  },
  screamContent: {
    wordWrap: 'break-word',
  },
}));

function ScreamDialog({
  openDialog,
  scream: { userImage, createdAt, body, likeCount, commentCount, comments },
  ui: { loading },
  getScream,
  likedScream,
  screamId,
  displayName,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  const [newPath, setNewPath] = useState('');

  useEffect(() => {
    if (open === true) getScream(screamId);
  }, [open, getScream, screamId]);

  useEffect(() => {
    if (openDialog) handleClickOpen();
  }, [openDialog]);

  useEffect(() => {
    if (window.location.pathname === `/users/${displayName}/scream/${screamId}`)
      handleClickOpen();
  }, [window.location.pathname]);

  const handleClickOpen = () => {
    setOldPath(window.location.pathname);
    const path = `/users/${displayName}/scream/${screamId}`;
    window.history.pushState(null, null, path);
    setNewPath(path);
    setOpen(true);
  };

  const handleClose = () => {
    if (oldPath !== newPath) window.history.pushState(null, null, oldPath);
    else window.history.pushState(null, null, `/users/${displayName}`);
    setOpen(false);
  };

  const actionArea = !loading && (
    <DialogActions>
      <Grid container direction="column">
        <Grid container justify="flex-end">
          <SocialButtons
            screamId={screamId}
            likeCount={likeCount}
            likedScream={likedScream}
            commentCount={commentCount}
          />
          <Grid container>
            <CommentForm screamId={screamId} />
          </Grid>
        </Grid>
      </Grid>
    </DialogActions>
  );

  const commentView = (
    <DialogContent>
      <Comments comments={comments} />
    </DialogContent>
  );

  const dialogMarkup = loading ? (
    <div className={classes.flex}>
      <CircularProgress thickness={2} size={150} className={classes.progress} />
    </div>
  ) : (
    <>
      <Grid container spacing={2}>
        <Grid item sm={2} xs={2}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} xs={10} className={classes.screamContent}>
          <Typography
            component={Link}
            color="primary"
            variant="h6"
            to={`/users/${displayName}`}
          >
            @{displayName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {dayjs(createdAt).format('h:mm A, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
      {actionArea}
      {commentView}
    </>
  );

  return (
    <>
      <Tooltip title="Expand Scream">
        <IconButton onClick={handleClickOpen}>
          <UnfoldMoreIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle className={classes.title}>
          Scream Details
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  ui: state.ui,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getScream })(ScreamDialog);
