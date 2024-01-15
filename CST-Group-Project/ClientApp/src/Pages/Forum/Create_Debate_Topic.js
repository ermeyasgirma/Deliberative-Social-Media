import React, { Component, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { AuthStateContext } from '../../Context'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

/*

    The form inside the popup to create a debate topic. 

    The popup is only displayed on the timeline component for admins - and the post request needs an admin token.

    Work still to be done here to add media upload - ran out of time. 

*/


class CreateDebateTopicComponent extends Component {

    static contextType = AuthStateContext;

    constructor(props) {
        super(props);
        this.state={topic:'',content:'', type:'TEXT', description:'', caption:'',vetted:false}
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleChange(e){
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
    }


    async handleSubmit(event) {
    
    alert('A debate topic was created: ' + this.state.topic + this.state.content + this.state.type);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.context.token},
        body: JSON.stringify({ Name: this.state.topic, Body: this.state.content, Type: this.state.type, Description: this.state.description, OpenFlag: !this.state.vetted})
    };

    const response = await fetch('api/Topic', requestOptions);
    const data = await response.json();

    }

    render() {
        const types = ['TEXT','PICTURE','POLL',"VIDEO"]
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <div class='row'>
                    <Typography className={classes.heading} component="h1">
                        Create Debate Topic
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={() => {this.props.close();}}>
                    <CancelIcon />
                    </IconButton>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="topic-input"
                                    name="topic"
                                    label="Topic Name"
                                    variant="outlined"
                                    type="text"
                                    onChange={this.handleChange}
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
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="content-input"
                                    name="content"
                                    variant="outlined"
                                    type="text"
                                    label="Topic Content"
                                    onChange={this.handleChange}
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
                                    }}
                                />
                            </FormControl>


                            <FormControl fullWidth margin="normal">
                            <FormControlLabel
                                label={this.state.vetted ? "Vetted users only" : "Open to Public"}
                                control={
                                  <Switch
                                    checked={this.state.vetted}
                                    onChange={() => {this.setState({vetted: !this.state.vetted})}}
                                    color="primary"
                                    />
                                }
                              />
                            </FormControl>


                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                        </form>
                </Paper>
            </div>

        );
    }
}

export default withStyles(styles)(CreateDebateTopicComponent);