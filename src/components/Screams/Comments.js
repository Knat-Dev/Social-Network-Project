import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  commentImage: {
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: '1.5rem',
    verticalAlign: 'baseline',
  },
  bottomMargins: {
    marginBottom: '1rem',
  },
  invisibleSeperator: {
    margin: '0.3rem 0',
    border: 'none',
  },
}));

export default function Comments({ comments }) {
  const classes = useStyles();

  return (
    <Grid container>
      {comments &&
        comments.map((comment, index) => {
          const { body, createdAt, userImage, displayName } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                {index !== 0 && <Divider style={{ margin: '1rem 0' }} />}

                <Grid container alignItems={'center'}>
                  <Grid item sm={2} xs={2}>
                    <img src={userImage} className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="body1"
                        component={Link}
                        className={classes.link}
                        to={`/users/${displayName}`}
                        color="primary"
                      >
                        @{displayName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm A, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />

                      <Typography variant="body1" color="textPrimary">
                        {body}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
    </Grid>
  );
}
