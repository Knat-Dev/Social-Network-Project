import React from 'react';
import {
  Button,
  makeStyles,
  Paper,
  Link as MuiLink,
  Divider,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CloudUpload from '@material-ui/icons/CloudUpload';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import dayjs from 'dayjs';
import EditDetails from './EditDetails';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0 3rem',
  },
}));

export default function UserProfile({
  user: { imageUrl, displayName, bio, location, website, createdAt },
  loading,
}) {
  const classes = useStyles();

  let profileMarkup = !loading ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${displayName}`}
            color={'primary'}
            variant="h5"
          >
            <span style={{ marginBottom: '1rem' }}> @{displayName}</span>
          </MuiLink>
          <Divider />
          <div style={{ marginTop: '1rem' }}>
            {bio && (
              <>
                {bio}
                <hr />
              </>
            )}
            {location && (
              <>
                <LocationOnIcon color="primary" />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />{' '}
                <a href={website} rel="noopener noreferrer">
                  {website}
                </a>
                <hr />
              </>
            )}
          </div>
          {createdAt && (
            <>
              <CalendarTodayIcon color="primary" />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </>
          )}
        </div>
      </div>
    </Paper>
  ) : (
    <Grid container justify="center">
      <Grid item>
        <CircularProgress thickness={2} size={100} />
      </Grid>
    </Grid>
  );

  return profileMarkup;
}
