import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

const DeleteScream = ({ screamId, deleteScream }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUserScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Scream">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Scream?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Scream? this action is not
            reversable
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteUserScream} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default connect(undefined, { deleteScream })(DeleteScream);
