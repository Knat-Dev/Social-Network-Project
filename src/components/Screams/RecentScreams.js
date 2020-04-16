import React from 'react';
import Scream from './Scream';
import { Typography, Grid, CircularProgress } from '@material-ui/core';

export default function RecentScreams({ screams, loading, screamId }) {
  return loading ? (
    <Grid container justify="center">
      <Grid item>
        <CircularProgress thickness={2} size={150} />
      </Grid>
    </Grid>
  ) : screams.length === 0 ? (
    <Typography variant="h5" align="center">
      No Screams...
    </Typography>
  ) : !screamId ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamId)
        return <Scream key={scream.screamId} scream={scream} />;
      else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );
}
