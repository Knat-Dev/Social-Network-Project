import React, { useContext } from 'react';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  useTheme,
  IconButton,
  createMuiTheme,
  Tooltip,
  Grid,
} from '@material-ui/core';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { Brightness4, Brightness7, Home } from '@material-ui/icons';
import { connect } from 'react-redux';
import TooltipIconButton from '../util/TooltipIconButton';
import PostScream from '../Screams/PostScream';
import Notifications from '../Notifications';
const useStyles = makeStyles((theme) => ({
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: '40px',
  },
  iconButton: {
    color: '#fff',
    margin: '0 2rem',
  },
}));

const Navbar = ({ authenticated }) => {
  const _theme = useTheme();
  const themeMode = _theme.palette.type;
  const [theme, setTheme] = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(
      createMuiTheme({
        ...theme,
        palette: {
          primary: { ...theme.palette.primary },
          secondary: { ...theme.palette.secondary },
          type: theme.palette.type === 'dark' ? 'light' : 'dark',
        },
      })
    );
  };
  const classes = useStyles();
  return (
    <AppBar color={theme.palette.type === 'dark' ? 'default' : 'primary'}>
      <Toolbar>
        <Grid container alignItems="center" justify="center">
          <Grid item sm={4}></Grid>
          <Grid item sm={4} className={classes.center}>
            {authenticated ? (
              <>
                <PostScream className={classes.iconButton} />
                <TooltipIconButton tip="Home" onClick={() => {}} to="/">
                  <Home />
                </TooltipIconButton>
                <Notifications />
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </Grid>
          <Grid item sm={4} className={classes.right}>
            <Tooltip title="Change Theme Contrast">
              <IconButton color={'inherit'} onClick={toggleTheme}>
                {themeMode === 'dark' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(Navbar);
