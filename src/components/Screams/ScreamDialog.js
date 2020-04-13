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
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import TooltipButton from '../util/TooltipButton';
import SocialButtons from './SocialButtons';

const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxWidth: 200,
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
    padding: '30px',
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
}));

function ScreamDialog({
  scream: { userImage, createdAt, body, likeCount },
  ui: { loading },
  authenticated,
  getScream,
  likedScream,
  screamId,
  displayName,
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open === true) getScream(screamId);
  }, [open, getScream, screamId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actionArea = !loading && (
    <DialogActions>
      <SocialButtons
        screamId={screamId}
        likeCount={likeCount}
        likedScream={likedScream}
      />
    </DialogActions>
  );

  const dialogMarkup = loading ? (
    <div className={classes.flex}>
      <CircularProgress size={150} className={classes.progress} />
    </div>
  ) : (
    <>
      <Grid container>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} style={{ wordWrap: 'break-word' }}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${displayName}`}
          >
            @{displayName}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography color="textSecondary" variant="body2">
            {dayjs(createdAt).format('h:mm A, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <TooltipButton onClick={handleClickOpen} tip="Expand Scream">
        <UnfoldMoreIcon color="primary" />
      </TooltipButton>
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
        {actionArea}
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
