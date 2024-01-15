import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { AuthDispatchContext, logout } from '../../Context';
import styles from './styles';

/*
    Creates the Navigation Bar displayed at the top of every page in the application.

    Contains:
        - A home button allowing users to return to the timeline page.
        - The group name.
        - A search bar.
        - If the user is logged in:
            - A button linking to their profile page
            - A button linking to their history page
            - A sign out button
        - If the user is not logged in:
            - A log in button
            - A sign up button

*/

class NavbarComponent extends Component {

    state = {}
    classes = null;

    static contextType = AuthDispatchContext;

    handleProfile = () => this.props.history.push('/profile');

    handleLogin = () => this.props.history.push('/login');

    handleSignup = () => this.props.history.push('/signup');

    handleHome = () => this.props.history.push('/timeline');

    handleHistory = () => this.props.history.push('/history');

    async handleLogout(e) {

        await logout(this.context)
        this.props.history.push('/timeline')
    }

    loggedIn = () => {
        return (
            <div>          
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={this.handleProfile}
                    color="inherit"
                >
                    <AccountCircle className={this.props.classes.profile} />
                </IconButton>
                <Button
                    onClick={this.handleHistory}
                    color="inherit"
                    variant="outlined">
                    History
                </Button>
                <Button className={this.props.classes.logout}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                    onClick={e => this.handleLogout(e)}
                >
                    Log Out
                </Button>
            </div>
        );
    }

    anonymousUser = () => {
        return (
            <React.Fragment>
                <Button className={this.props.classes.login}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                    onClick={this.handleLogin}
                >
                    Log In
                </Button>
          
                <Button className={this.props.classes.login}
                    variant="outlined"
                    color="inherit"
                    size="small"
                    onClick={this.handleSignup}
                >
                    Sign Up
                </Button>
            </React.Fragment>
        );
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.grow}>
                <AppBar className={classes.main} position="static">
                    <Toolbar>
                        <IconButton onClick={this.handleHome}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Team Juliet
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.buttons}>
                            {
                                localStorage.getItem('currentUser') ? this.loggedIn() : this.anonymousUser()
                            }
                        </div>


                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavbarComponent);