import React, { useState, useEffect } from 'react';
import { Add } from '@material-ui/icons';
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';
import SpinnerButton from '../util/SpinnerButton';

function PostScream({
  ui: { loading, errors: _errors },
  postScream,
  clearErrors,
  className,
}) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(_errors);
  }, [_errors]);

  useEffect(() => {
    !loading && Object.keys(_errors).length === 0 && setOpen(false);
    setBody('');
  }, [loading, _errors]);

  useEffect(() => {
    body !== '' && setErrors({});
  }, [body]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    setOpen(false);
  };

  const post = () => {
    const scream = {
      body,
    };
    postScream(scream);
  };

  return (
    <>
      <Tooltip title="Post Scream">
        <IconButton
          className={className}
          onClick={handleClickOpen}
          style={{ margin: '0 2rem' }}
        >
          <Add />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{'Post Scream'}</DialogTitle>
        <DialogContent>
          <TextField
            onKeyPress={(e) => (e.key === 'Enter' ? post() : null)}
            autoFocus
            label="Scream Body"
            fullWidth
            multiline={true}
            rows={3}
            error={errors.body ? true : false}
            helperText={errors.body}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <SpinnerButton
            onClick={post}
            variant="text"
            color="primary"
            type="submit"
            text="Post"
            loading={loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  PostScream
);
