import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

function Notifications({ notifications, markNotificationsRead }) {
  const [anchorEl, setAnchorEl] = useState(null);
  dayjs.extend(relativeTime);

  const handleOpen = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = (e) => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => {
        console.log(not.screamId, not.notificationId);
        return not.notificationId;
      });
    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationIcon;
  let notificationAmount = notifications.filter((not) => not.read === false)
    .length;

  if (notifications && notifications.length > 0) {
    notificationAmount > 0
      ? (notificationIcon = (
          <Badge badgeContent={notificationAmount} color="secondary">
            <NotificationsIcon color="action" />
          </Badge>
        ))
      : (notificationIcon = (
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        ));
  } else {
    notificationIcon = (
      <Badge badgeContent={0} color="secondary">
        <NotificationsIcon />
      </Badge>
    );
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: '1rem' }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: '1rem' }} />
          );
        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="primary"
              variant="body1"
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {`${not.sender} has ${verb} your scream ${time}`}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no new notifications</MenuItem>
    );

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          style={{ margin: '0 2rem' }}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        getContentAnchorEl={null}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
