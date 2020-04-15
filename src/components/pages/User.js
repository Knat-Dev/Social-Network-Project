import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getUserData } from '../../redux/actions/dataActions';
import RecentScreams from '../Screams/RecentScreams';
import UserProfile from '../UserProfile';

function User({
  match: {
    params: { displayName: handle },
  },
  getUserData,
  data: {
    loading,
    profile: { user = {}, screams = [] },
  },
}) {
  useEffect(() => {
    getUserData(handle);
  }, [getUserData, handle]);

  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        <RecentScreams screams={screams} loading={loading} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <UserProfile user={user} loading={loading} />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
