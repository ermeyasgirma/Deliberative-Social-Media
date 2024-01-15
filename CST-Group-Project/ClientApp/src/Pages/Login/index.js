import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, AuthDispatchContext } from '../../Context' 
import CssBaseline from '@material-ui/core/CssBaseline';
import NavbarComponent from '../../Components/Navbar/Navbar';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles'

/*

    Creates the page which allows users to log in to an existing account.

    Contains a form where the users can enter their username and password.

    If the values entered are incorrect, the user is presented with an error message.

    Users must have confirmed their account via their email before login will work.

*/

class Login extends Component {

    static contextType = AuthDispatchContext;

    state = {
        username: '', 
        password: ''
    }

    setUsername(username){
        this.setState({username:username})
    }

    setPassword(password){
        this.setState({password:password})
    }


    async handlelogin(e) {
        e.preventDefault();

        try{
            let response = await loginUser(this.context, {"username":this.state.username, "password":this.state.password}) //Login user handles the creation of the request

            if(!response.auth_token) {
                alert('Login failed.')
                return;
            }
            this.props.history.push('/timeline') // on success load timeline
        } catch(error) {
            alert('Login failed.')
        }

        return;

    }

    async forgotPassword(e) {

        e.preventDefault();
        
        try {
            const res = await fetch('api/Person/exists_name/'+this.state.username)
            const exists = await res.json()
            if (exists == true){

                const email = await fetch('api/Person/'+this.state.username+'/password/reset/send')
                if (email.status == 200){
                    alert('Email to reset password sent')
                    this.props.history.push('/timeline')
                } else {
                    alert('Reset password failed due to unknown error')
                }

            }else {
                alert('Username does not exist')
            }
        } catch(error){
            alert('Username does not exist')
        }

        return

    }

    render() {

    const { classes } = this.props;

    return (
        <React.Fragment>
            <NavbarComponent history={this.props.history} />
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography className={classes.heading} component="h1">
                        Log In
                    </Typography>
                    <form className={classes.form} onSubmit={e => this.handlelogin(e)}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="username-input"
                                    label="Username"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => this.setUsername(e.target.value)}
                                    required
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused
                                        }
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline
                                        },
                                        inputMode: "numeric"
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="password-input"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    onChange={(e) => this.setPassword(e.target.value)}
                                    required
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused
                                        }
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline
                                        },
                                        inputMode: "numeric"
                                    }}
                                />
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Log In</Button>
                            </form>


                            <Grid className={classes.grid} container spacing={1}>
                                <Grid item xs={3}>
                                    <Link className={classes.linkLeft} to="/signup">Need an account?</Link>
                                </Grid>
                                <Grid item xs={3}>
                                    <Link className={classes.linkRight} onClick={e => this.forgotPassword(e)}> Forgot password ?</Link>
                                </ Grid>
                            </Grid>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

export default withStyles(styles)(Login);