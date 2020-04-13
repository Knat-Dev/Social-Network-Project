import React from 'react';
import { makeStyles, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  progress: {
    position: 'absolute',
  },
});

export default function SpinnerButton({
  loading,
  text,
  fullWidth,
  variant = 'contained',
  color = 'inherit',
  type,
  onClick,
}) {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      type={type}
      fullWidth={fullWidth}
      color={color}
      variant={variant}
    >
      {text}
      {loading && (
        <CircularProgress
          color={'secondary'}
          size={30}
          className={classes.progress}
        />
      )}
    </Button>
  );
}
