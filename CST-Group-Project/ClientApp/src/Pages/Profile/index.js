import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import NavbarComponent from '../../Components/Navbar/Navbar';
import countries from '../../Config/countries';
import genders from '../../Config/genders';
import { AuthStateContext } from '../../Context';
import styles from './styles';


/*

    Creates the page allowing users to view the current details of their profile and modify them.

    Only accessible to users who are signed in.

    Contains a form with the same options as the signup form.
    The current values of the form are the current details.
    User can modify values and click save to update the database.

*/

class ProfileComponent extends Component {
        
    static contextType = AuthStateContext;

        state = {}
        data = this.context
        saveProfile = this.saveProfile.bind(this);

        async componentDidMount() {

            const response = await fetch('api/Person/'+this.data.user.username)
            const profile = await response.json()

            this.setState(profile);
        }

        userInput(type, e){
            this.setState({[type]: e.target.value});
        }

        countryInput = (_, v) => {
            this.setState({ country: v.name });
        }

        genderInput = (_, v) => {
            this.setState({ gender: v });
        }

        async saveProfile() {

            const token = this.data.token;

            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))) {
                alert("You have entered an invalid email address!")
                return
              }

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token},
                body: JSON.stringify(this.state)
            }

            const response = await fetch('api/Person/'+this.data.user.username, requestOptions);

            if (response.status == 204){
                alert('changes saved')
                this.forceUpdate()
            }
        }

        render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <NavbarComponent history={this.props.history} />
                <Container maxWidth='m'>
                                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} component="h1">
                                Profile                        
                            </Typography>
                        <form className={classes.form} onSubmit={this.saveProfile}>
                            <Grid className={classes.grid} container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth margin="normal">
                                        <TextField
                                            id="first-name-input"
                                            variant="outlined"
                                            value={this.state.firstName}
                                            helperText="First Name"
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
                                            value={this.state.lastName}
                                            helperText="Last Name"
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
                                            value={this.state.name}
                                            helperText="User Name"
                                            disabled
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('name', e)}
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
                                            value={this.state.email}
                                            helperText="Email"
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
                                    <FormControl fullWidth margin="normal">
                                        <Autocomplete
                                            id="country-input"
                                            options={countries}
                                            getOptionLabel={(country) => country.name}
                                            onChange={(e,v) => this.countryInput(e, v)}
                                            renderInput={(params) => 
                                                <TextField
                                                    { ...params }
                                                    helperText={"Country : "+ this.state.country}
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
                                            variant="outlined"
                                            type="text"
                                            value={this.state.county}
                                            helperText="County"
                                            onChange={(e) => this.userInput('county', e)}
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
                                            value={this.state.age}
                                            helperText="Age"
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
                                            onChange={(e,v) => this.genderInput(e,v)}
                                            renderTags={(tagValue, getTagProps) => {
                                                return tagValue.map((option, index) => (
                                                  <Chip classes={{ root: classes.gender }} {...getTagProps({ index })} label={option} />
                                                ));
                                              }}
                                            renderInput={(params) => 
                                                <TextField
                                                    { ...params }
                                                    helperText={"Gender : "+this.state.gender}
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
                                            value={this.state.ethnicBackground}
                                            helperText="Ethnicity"
                                            variant="outlined"
                                            type="text"
                                            onChange={(e) => this.userInput('ethnicBackground', e)}
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
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Save Changes to Profile</Button>
                        </form>                        
                    </Paper>
                </Container>
            </React.Fragment>
        );
    }
}


export default withStyles(styles)(ProfileComponent);