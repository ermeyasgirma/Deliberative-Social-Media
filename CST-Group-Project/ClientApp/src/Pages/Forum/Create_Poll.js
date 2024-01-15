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


/*

    The form inside the popup to create a poll.

    The popup is only displayed on the forum component for admins - and the post request needs an admin token.

    Creates a poll with a min of 2 options and a max of 4 options along with a title query of users to vote on.

*/


class CreatePollComponent extends Component {

    static contextType = AuthStateContext;

    constructor(props, context) {
        super(props, context);
        this.topic_id = this.props.topic_id;
        this.state={question:'',topicId:this.topic_id, answer1:'', answer2:'', answer3:'', answer4:''}
        

        
        this.data = this.context;
    
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
        event.preventDefault();
          
        const token = this.data.token
        
        alert('A poll was created: Q:' + this.state.question + ' tId:' +  this.state.topicId + '.');
        alert('The answers were : ' + this.state.answer1 + ', ' + this.state.answer2 + ', ' + this.state.answer3 + ', ' + this.state.answer4);

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
            body: JSON.stringify({ Question: this.state.question, TopicId: this.state.topicId })
        };
        
        var response = await fetch('api/Poll', requestOptions);
        var data = await response.json();
        
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
            body: JSON.stringify({ AnswerText: this.state.answer1, PollId: data.id })
        };
        response = await fetch('api/Answer', requestOptions);

        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
            body: JSON.stringify({ AnswerText: this.state.answer2, PollId: data.id })
        };
        response = await fetch('api/Answer', requestOptions);

        if (!(this.state.answer3==='')) {
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
                body: JSON.stringify({ AnswerText: this.state.answer3, PollId: data.id })
            };
            response = await fetch('api/Answer', requestOptions);
        }

        if (!(this.state.answer4==='')) {
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
                body: JSON.stringify({ AnswerText: this.state.answer4, PollId: data.id })
            };
            response = await fetch('api/Answer', requestOptions);
        }
      }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <div class='row'>
                    <Typography className={classes.heading} component="h1">
                        Create Poll
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={() => {this.props.close();}}>
                    <CancelIcon />
                    </IconButton>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="poll-input"
                                    name="question"
                                    label="Poll Question"
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

                            <FormControl required fullWidth margin="normal">
                                <TextField
                                    id="option-input1"
                                    name="answer1"
                                    label="Option 1"
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

                            <FormControl required fullWidth margin="normal">
                                <TextField
                                    id="option-input2"
                                    name="answer2"
                                    label="Option 2"
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

                            <FormControl required fullWidth margin="normal">
                                <TextField
                                    id="option-input3"
                                    name="answer3"
                                    label="Option 3"
                                    variant="outlined"
                                    type="text"
                                    onChange={this.handleChange}
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

                            <FormControl required fullWidth margin="normal">
                                <TextField
                                    id="option4"
                                    name="answer4"
                                    label="Option 4"
                                    variant="outlined"
                                    type="text"
                                    onChange={this.handleChange}
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

                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                        </form>
                </Paper>
            </div>

        );
    }
}

export default withStyles(styles)(CreatePollComponent);