import React from 'react';
import './App.css';

// React router
import { BrowserRouter, Route } from 'react-router-dom';

// My components
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';
import { ThemeProvider } from './Providers/ThemeProvider';
import jwtDecode from 'jwt-decode';
import AuthRoute from './components/util/AuthRoute';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';
import User from './components/pages/User';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken, decodedToken.exp * 1000 < Date.now());
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '80px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '120px',
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <Provider store={store}>
          <Navbar />
          <Container className={classes.container}>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/:displayName" component={User} />
            <Route
              exact
              path="/users/:displayName/scream/:screamId"
              component={User}
            />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
          </Container>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
