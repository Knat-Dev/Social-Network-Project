import React, { useState, useEffect } from 'react';
import {
  TextField,
  makeStyles,
  Grid,
  Typography,
  FormControl,
} from '@material-ui/core';
import AppIcon from '../../images/monkey.png';
import PhotoCredit from '../PhotoCredit';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import SpinnerButton from '../util/SpinnerButton';

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

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    props.loginUser(userData, props.history);
  };

  useEffect(() => {
    setErrors(props.ui.errors);
  }, [props.ui.errors]);

  useEffect(() => {
    setErrors({});
  }, []);

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
            Login
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors ? errors.email : ''}
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
              label="password"
            ></TextField>
          </FormControl>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <SpinnerButton
              color="primary"
              type="submit"
              text="Login"
              loading={loading}
            />
          </FormControl>
          <small>
            Don't have an account yet? Register{' '}
            <Link to={'/signup'} className={classes.link}>
              here
            </Link>
          </small>
        </form>
        <PhotoCredit />
      </Grid>
      <Grid item sm={4} xs={false}></Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
