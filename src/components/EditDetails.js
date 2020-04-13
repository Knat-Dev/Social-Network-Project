import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import EditIcon from '@material-ui/icons/Edit';

function EditDetails({
  editUserDetails,
  credentials: {
    bio: userBio = '',
    location: userLocation = '',
    website: userWebsite = '',
  },
}) {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      location,
      website,
    };
    editUserDetails(userDetails);
  };

  useEffect(() => {
    setBio(userBio);
    setLocation(userLocation);
    setWebsite(userWebsite);
  }, [userBio, userLocation, userWebsite]);

  return (
    <>
      <Tooltip placement="top" title="Edit Details">
        <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change or add new details down below
          </DialogContentText>
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            autoFocus
            margin="normal"
            id="bio"
            label="Bio Information"
            type="text"
            fullWidth
          />{' '}
          <TextField
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            margin="normal"
            id="website"
            label="Your Website"
            type="text"
            fullWidth
          />{' '}
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            margin="normal"
            id="location"
            label="Location"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
