import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getUserData } from '../../redux/actions/dataActions';
import RecentScreams from '../Screams/RecentScreams';
import UserProfile from '../UserProfile';

function User({
  match: { params: { displayName: handle, screamId } = {} },
  getUserData,
  data: {
    loading,
    profile: { user = {}, screams = [] },
  },
}) {
  const [id, setId] = useState('');
  useEffect(() => {
    getUserData(handle);
  }, [getUserData, handle]);

  useEffect(() => {
    console.log(screamId);
  }, [screamId]);

  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        <RecentScreams
          screams={screams}
          loading={loading}
          screamId={screamId}
        />
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
