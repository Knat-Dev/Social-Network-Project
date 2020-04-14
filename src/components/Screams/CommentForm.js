import React from 'react';
import {
  TextField,
  Button,
  makeStyles,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  FilledInput,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
import SendIcon from '@material-ui/icons/Send';
import TooltipIconButton from '../util/TooltipButton';

const useStyles = makeStyles((theme) => ({}));

function CommentForm({ ui, submitComment, authenticated }) {
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('hi!');
  };

  const formMarkup = authenticated && (
    <Grid item sm={12} xs={12}>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Comment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TooltipIconButton color="inherit" tip="Send Comment">
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
