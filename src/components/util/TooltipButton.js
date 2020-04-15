import React from 'react';
import { Tooltip, IconButton, makeStyles, Badge } from '@material-ui/core';
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
  to,
  badgeContent,
  color,
  type,
}) {
  const classes = useStyles();
  return (
    <Tooltip title={tip}>
      <Link to={to ? to : ''} className={classes.link}>
        <IconButton
          type={type ? type : 'submit'}
          onClick={onClick}
          color={color ? color : 'primary'}
        >
          <Badge color="secondary" badgeContent={badgeContent}>
            {children}
          </Badge>
        </IconButton>
      </Link>
    </Tooltip>
  );
}
