import React from 'react';
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    color: '#fff',
  },
});

export default function TooltipIconButton({
  children,
  onClick,
  tip,
  btnClassname,
  tipClassname,
  to,
}) {
  const classes = useStyles();
  return (
    <Tooltip title={tip} className={tipClassname}>
      <Link to={to} className={classes.link} style={{ margin: '0 2rem' }}>
        <IconButton
          onClick={onClick}
          className={btnClassname}
          color={'inherit'}
        >
          {children}
        </IconButton>
      </Link>
    </Tooltip>
  );
}
