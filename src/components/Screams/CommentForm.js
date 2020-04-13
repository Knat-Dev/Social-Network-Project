import React from 'react';
import { TextField, Button, makeStyles, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({}));

function CommentForm({ ui, submitComment, authenticated }) {
  const formMarkup = authenticated && (
    <Grid container>
      <Grid item sm={8}>
        <TextField fullWidth variant="outlined"></TextField>
      </Grid>
      <Grid item sm={4}>
        <Button fullWidth>Send</Button>
      </Grid>
    </Grid>
  );

  return <>{formMarkup}</>;
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  ui: state.ui,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
