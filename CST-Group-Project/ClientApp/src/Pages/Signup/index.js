import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import NavbarComponent from '../../Components/Navbar/Navbar';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './styles';

import countries from '../../Config/countries';
import genders from '../../Config/genders';

/*

    Creates the signup page to allow new users to create accounts.

    Page contains a form which allows the users to enter information about themselves.
    The information we collect was specified by the client.

    There is a mixture of compulsory and optional fields indicated by asterisks.

    When a user enters their email, we check if it is valid before accepting submission.
    When a user enters a username, we check to see if it is unique before accepting submission.

*/

class SignupComponent extends Component {
    state = {
        firstName: null,
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        country: '',
        age: 0,
        gender: '',
        signupError: '',
        ethnicity:'',
        state:'',
        usernameValid:true,
        emailValid:true
    }

    async handleSignup(e) {
        e.preventDefault();

        if (this.state.password != this.state.passwordConfirmation){
            alert("Passwords don't match")
            return
        }

        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))) {
          alert("You have entered an invalid email address!")
          return (false)
        }

        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if ( !(strongRegex.test(this.state.password)) ){
            alert('Password must be at least 8 letters long, have one capital letter, one lowercase letter, one number and one symbol')
            return
        }

        const person = {
                'Name':this.state.username,
                'Email': this.state.email,
                'Gender': this.state.gender,
                'FirstName': this.state.firstName,
                'LastName': this.state.lastName,
                'Country': this.state.country.name,
                'County': this.state.state,
                'Age': this.state.age,
                'EthnicBackground':this.state.ethnicity
            }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({'username':this.state.username, 'email':this.state.email, 'password': this.state.password, 'newUser': person})
                };
                
                const response = await fetch('api/authenticate/register', requestOptions);
                const result = await response.json();

                if (result.status == 'Success'){

                    try {
                        const response = await fetch('api/Person/'+this.state.username+'/email/confirmation/send')

                        if (response.status == 200){
                            alert(result.message + " Please verify email and then login again")
                            this.props.history.push('/timeline');
                        } else {
                            alert('unknown error - please contact administrator')
                        }

                    } catch(error){
                        alert('unknown error - please contact administrator')
                    }
                } else{
                    alert(result.message)
                }

            } 
    
    countryInput = (_, v) => {
        this.setState({ country: v });
    }

    genderInput = (_, v) => {
        this.setState({ gender: v });
    }

    async userInput(type, e) {
        switch (type) {
            case 'firstName':
                this.setState({ firstName: e.target.value });
                break;

            case 'lastName':
                this.setState({ lastName: e.target.value });
                break;

            case 'username':
                this.setState({ username: e.target.value });
                const res = await fetch('api/Person/exists_name/'+e.target.value)
                const exists = await res.json()
                if (exists == true){
                    this.setState({usernameValid:false})
                } else{
                    this.setState({usernameValid:true})
                }
                break;

            case 'email':
                this.setState({ email: e.target.value });
                break;

            case 'password':
                this.setState({ password: e.target.value });
                break;

            case 'passwordConfirmation':
                this.setState({ passwordConfirmation: e.target.value });
                break;

            case 'age':
                this.setState({ age: e.target.value });
                break;

            case 'ethnicity':
                    this.setState({ ethnicity: e.target.value });
                    break;

            case 'state':
                    this.setState({state: e.target.value})
                    break;
            default:
                break;
        }
    }

    logIn = (e) => {
        e.preventDefault();

        this.props.history.push('/login');
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
                            Sign Up
                        </Typography>
                        <form className={classes.form} onSubmit={e => this.handleSignup(e)}>
                            <Grid className={classes.grid} container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="first-name-input"
                                            label="First Name"
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('firstName', e)}
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="last-name-input"
                                            label="Last Name"
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('lastName', e)}
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
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="username-input"
                                            label="Username"
                                            helperText={this.state.usernameValid ? "Username available" : "Username taken" }
                                            error={!this.state.usernameValid}
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('username', e)}
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
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="email-input"
                                            label="Email"
                                            helperText={this.state.emailValid ? "Email available" : "Email taken" }
                                            error={!this.state.emailValid}
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('email', e)}
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="password-input"
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            onChange={(e) => this.userInput('password', e)}
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="password-confirmation-input"
                                            label="Re-Enter Password"
                                            variant="outlined"
                                            type="password"
                                            onChange={(e) => this.userInput('passwordConfirmation', e)}
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal">
                                        <Autocomplete
                                            id="country-input"
                                            options={countries}
                                            getOptionLabel={(country) => country.name}
                                            onChange={(e,v) => this.countryInput(e, v)}
                                            renderInput={(params) => 
                                                <TextField
                                                    { ...params }
                                                    label="Country"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.cssLabel,
                                                            focused: classes.cssFocused
                                                        }
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        classes: {
                                                            root: classes.cssOutlinedInput,
                                                            focused: classes.cssFocused,
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            id="state-input"
                                            label="State"
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('state', e)}
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="age-input"
                                            label="Age"
                                            variant="outlined"
                                            type='number'
                                            value={this.state.age}
                                            onChange={(e) => this.userInput('age', e)}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused
                                                },
                                                shrink: true 
                                            }}
                                            InputProps={{
                                                classes: {
                                                    root: classes.cssOutlinedInput,
                                                    focused: classes.cssFocused,
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                inputMode: "number"
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal">
                                        <Autocomplete
                                            id="gender-input"
                                            options={genders}
                                            getOptionLabel={(gender) => gender}
                                            onChange={(e,v) => this.genderInput(e, v)}
                                            renderTags={(tagValue, getTagProps) => {
                                                return tagValue.map((option, index) => (
                                                  <Chip classes={{ root: classes.gender }} {...getTagProps({ index })} label={option} />
                                                ));
                                              }}
                                            renderInput={(params) => 
                                                <TextField
                                                    { ...params }
                                                    label="Gender"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.cssLabel,
                                                            focused: classes.cssFocused
                                                        }
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        classes: {
                                                            root: classes.cssOutlinedInput,
                                                            focused: classes.cssFocused,
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            id="ethnicity-input"
                                            label="Ethnicity"
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('ethnicity', e)}
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
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                            <Link className={classes.linkRight} to="/login">Already have an account?</Link>
                        </form>                        
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SignupComponent);