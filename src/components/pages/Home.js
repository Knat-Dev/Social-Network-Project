import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import RecentScreams from '../Screams/RecentScreams';

export default function Home() {
  const [screams, setScreams] = useState([]);

  useEffect(() => {
    async function fetchScreams() {
      axios.get('/screams').then((res) => {
        setScreams(res.data);
      });
    }
    fetchScreams();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item sm={8} xs={12}>
        <RecentScreams screams={screams} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>profile</p>
      </Grid>
    </Grid>
  );
}
