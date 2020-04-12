import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  photoCredit: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function PhotoCredit() {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      className={classes.photoCredit}
    >
      Icons made by{' '}
      <a
        className={classes.link}
        href="https://www.flaticon.com/authors/flat-icons"
        title="Flat Icons"
      >
        Flat Icons
      </a>{' '}
      from{' '}
      <a
        className={classes.link}
        href="https://www.flaticon.com/"
        title="Flaticon"
      >
        www.flaticon.com
      </a>
    </Typography>
  );
}
