import React, { useState } from 'react';
import {
  TextField,
  Grid,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
import SendIcon from '@material-ui/icons/Send';
import TooltipIconButton from '../util/TooltipButton';

function CommentForm({ ui, submitComment, authenticated, screamId }) {
  const [commentBody, setCommentBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    submitComment(screamId, { body: commentBody });
    setCommentBody('');
  };

  const formMarkup = authenticated && (
    <Grid item sm={12} xs={12}>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            label="Comment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TooltipIconButton
                    onClick={onSubmit}
                    color="inherit"
                    tip="Send Comment"
                  >
                    <SendIcon color="inherit" />
                  </TooltipIconButton>
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
        </FormControl>
        <button hidden="hidden" type="submit" />
      </form>
    </Grid>
  );

  return <>{formMarkup}</>;
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  ui: state.ui,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
