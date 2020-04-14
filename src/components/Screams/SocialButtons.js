import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import TooltipButton from '../util/TooltipButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Tooltip, IconButton, Badge } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

function SocialButtons({
  authenticated,
  screamId,
  likedScream,
  likeScream,
  unlikeScream,
  likeCount,
  commentCount,
}) {
  const like = () => {
    likeScream(screamId);
  };

  const unlike = () => {
    unlikeScream(screamId);
  };

  const commentsButton = (
    <Tooltip title="Comments">
      <IconButton>
        <Badge color={'secondary'} badgeContent={commentCount}>
          <ChatIcon color={'primary'} />
        </Badge>
      </IconButton>
    </Tooltip>
  );

  const likeButton = !authenticated ? (
    <TooltipButton tip="Like" to="/login" badgeContent={likeCount}>
      <FavoriteBorder color="primary" />
    </TooltipButton>
  ) : likedScream() ? (
    <TooltipButton tip="Unlike" badgeContent={likeCount} onClick={unlike}>
      <FavoriteIcon color="primary" />
    </TooltipButton>
  ) : (
    <TooltipButton tip="Like" badgeContent={likeCount} onClick={like}>
      <FavoriteBorder color="primary" />
    </TooltipButton>
  );

  return (
    <>
      {likeButton}
      {commentsButton}
    </>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  scream: state.data.scream,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  SocialButtons
);
