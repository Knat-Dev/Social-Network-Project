import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import TooltipIconButton from '../util/TooltipButton';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
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
    console.log(screamId);
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <TooltipIconButton onClick={handleClickOpen} tip="Delete Scream">
        <DeleteIcon color="secondary" />
      </TooltipIconButton>
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
