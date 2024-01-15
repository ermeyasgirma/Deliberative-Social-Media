import React, { Component } from 'react';
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


class Reset extends Component {

    state = {
        username:'',
        token: '', 
        password: '',
        confirmPassword:''
    }

    setToken(token){
        this.setState({token:token})
    }

    setPassword(password){
        this.setState({password:password})
    }

    setUsername(username){
        this.setState({username:username})
    }

    setConfirmPassword(password){
        this.setState({confirmPassword:password})
    }

    async handleReset(e) {
        e.preventDefault();

        if (this.state.password != this.state.confirmPassword){
            alert("Passwords don't match")
            return
        }

        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if ( !(strongRegex.test(this.state.password)) ){
            alert('Password must be at least 8 letters long, have one capital letter, one lowercase letter, one number and one symbol')
            return
        }

        const requestOptions = {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Token":this.state.token,
                "Username":this.state.username,
                "NewPassword": this.state.password
            })
        }

        const response = await fetch('api/authenticate/reset-password', requestOptions);

        if (response.status == 200){
            alert("Password reset")
            this.forceUpdate();
            this.props.history.push('/timeline');
        }
        return;
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
                        Reset Password
                    </Typography>
                    <form className={classes.form} onSubmit={e => this.handleReset(e)}>

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
                                    id="token-input"
                                    label="Token"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => this.setToken(e.target.value)}
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
                                    label="New Password"
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

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="confirm-password-input"
                                    label="Confirm New Password"
                                    variant="outlined"
                                    type="password"
                                    onChange={(e) => this.setConfirmPassword(e.target.value)}
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

                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Reset</Button>
                        </form>
                </Paper>
            </div>
        </React.Fragment>
        );
    }


}

export default withStyles(styles)(Reset);