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
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CloudUpload from '@material-ui/icons/CloudUpload';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import dayjs from 'dayjs';
import { uploadImage, logoutUser } from '../redux/actions/userActions';
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

const Profile = ({
  uploadImage,
  logoutUser,
  user: {
    authenticated,
    credentials: { displayName, createdAt, imageUrl, bio, website, location },
    loading,
  },
}) => {
  const classes = useStyles();
  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };
  const handleEditImage = (e) => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const handleLogout = (e) => {
    logoutUser();
  };
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              hidden="hidden"
              type="file"
              id="imageInput"
              onChange={handleUploadImage}
            />
            <Tooltip title="Upload Profile Image">
              <IconButton onClick={handleEditImage} className="button">
                <CloudUpload color="primary" />
              </IconButton>
            </Tooltip>
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
            <CalendarTodayIcon color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <div className={classes.buttons + ' ' + classes.flexRow}>
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={handleLogout}>
                <KeyboardReturnIcon color="primary" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          Please log in or create an account
        </Typography>
        <div className={classes.buttons}>
          <Button
            className="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <Grid container justify="center">
      <Grid item>
        <CircularProgress thickness={2} size={150} />
      </Grid>
    </Grid>
  );

  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { uploadImage, logoutUser })(Profile);
