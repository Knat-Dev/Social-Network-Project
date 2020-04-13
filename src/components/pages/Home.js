import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import RecentScreams from '../Screams/RecentScreams';
import Profile from '../Profile';
import { connect } from 'react-redux';
import { getScreams } from '../../redux/actions/dataActions';

function Home({ getScreams, data: { screams, loading } }) {
  useEffect(() => {
    getScreams();
  }, [getScreams]);

  return (
    <Grid container spacing={5}>
      <Grid item sm={8} xs={12}>
        <RecentScreams screams={screams} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getScreams })(Home);
