import React, { useState, useEffect } from 'react';
import {
  TextField,
  makeStyles,
  Grid,
  Typography,
  Button,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import AppIcon from '../../images/monkey.png';
import PhotoCredit from '../PhotoCredit';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center',
  },
  monkey: {
    width: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
  },
  button: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      displayName,
    };
    props.signupUser(userData, props.history);
  };

  useEffect(() => {
    setErrors(props.ui.errors);
  }, [props.ui.errors]);

  const {
    ui: { loading },
  } = props;

  return (
    <Grid container style={{ height: '80vh' }} alignItems={'center'}>
      <Grid item sm={4} xs={false}></Grid>
      <Grid item sm={4} xs={12}>
        <form noValidate className={classes.form} onSubmit={onSubmit}>
          <img className={classes.monkey} src={AppIcon} alt="" />
          <Typography className={classes.title} variant="h2">
            Signup
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="outlined"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              helperText={errors.displayName}
              error={errors.displayName ? true : false}
              id="displayName"
              type="text"
              label="Display Name"
            ></TextField>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email}
              error={errors.email ? true : false}
              id="email"
              type="email"
              label="Email"
            ></TextField>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
              id="password"
              type="password"
              label="Password"
            ></TextField>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm Password"
            ></TextField>
          </FormControl>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              color={'primary'}
              variant={'contained'}
            >
              Login
              {loading && (
                <CircularProgress
                  color={'secondary'}
                  size={30}
                  className={classes.progress}
                />
              )}
            </Button>
          </FormControl>
          <small>
            Already have an account? Login{' '}
            <Link className={classes.link} to="/login">
              here
            </Link>
          </small>
        </form>
        <PhotoCredit />
      </Grid>
      <Grid item sm={4} xs={false}></Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

export default connect(mapStateToProps, { signupUser })(Signup);
