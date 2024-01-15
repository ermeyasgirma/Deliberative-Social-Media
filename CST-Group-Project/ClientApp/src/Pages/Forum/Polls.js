import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import { AuthStateContext } from '../../Context'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './pollStyles';


/*

   The component for polls.

   Allows logged in users to vote on polls, and everybody to see the result of the polls. 

*/


class PollsComponent extends Component {

    state = {
        topicId: this.props.topic_id, 
        poll: this.props.poll,
        selected: null,
        open: false,
        anchor: null
    }
      
    static contextType = AuthStateContext;

    data = this.context
    maxLength = 30;
      

    async handleChange(aid, atext) {
        
        this.setState({ selected: atext })

      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.data.token },
            body: JSON.stringify({ AnswerId: aid, PersonName: this.data.user.username})
        };
        const post = await fetch('api/Vote', requestOptions);
        alert('Vote Registered');
    }

    handleOpen = (e) => {
        this.setState({
            open: true,
            anchor: e.currentTarget
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            anchor: null
        });
    }

    componentDidMount() {
        this.isSelected();
    }
    //use the state field called selected to decide which answer gets checked field as true 
    async isSelected() {
        const pollno = this.props.poll.id;
        const name = this.context.user.username;
        const ansResponse = await fetch("api/Answer/PersonName/" + pollno + "/" + name);
        const fetchedAns = await ansResponse.json();
        if (fetchedAns.length == 0) { return; }
        var n = fetchedAns.length - 1; 
        const answers = this.props.poll.answers;
        /* 
         check if any of the answers from current poll (this.props.poll.id) have been selected by user
         do this by iterating through (this.props.poll.answers) and setting this.state.selected to the 
         answerText of that answer if it's equal to vote.answerText
         */
        var result = [];
        answers.map(ans => (ans.answerText === fetchedAns[0].answerText) ? this.setState({selected : fetchedAns[n].answerText}) : result = result);
    }


    isLoggedIn() {
        const { classes } = this.props;

        return (
            <RadioGroup className={classes.option} value={this.state.selected} >
                {
                    this.props.poll.answers.map(ans => {
                        return (
                            <FormControlLabel className={classes.option}
                                value={ans.answerText}
                                control={<Radio onChange={() => this.handleChange(ans.id, ans.answerText)} />}
                                checked={this.state.selected === ans.answerText ? true : false}
                                label={ans.answerText}
                            />
                        )
                    })
                }
            </RadioGroup>
            );
    }

    isAnonymous() {
        const { classes } = this.props;
        return (
            <RadioGroup className={classes.option} value={this.state.selected} >
                {
                    this.props.poll.answers.map(ans => {
                        return (
                            <FormControlLabel className={classes.option}
                                value={ans.answerText}
                                control={<Radio onChange={null} />}
                                label={ans.answerText}
                            />
                        )
                    })
                }
            </RadioGroup>
            );
    }

    render() {
        const { classes } = this.props;
        const numVotes = this.props.poll.answers.reduce((acc, ans) => acc + ans.votes, 0);

        if (!this.props.poll || this.props.poll.length==0){return;}
        return (
            <React.Fragment>
                <Card className={classes.thumbnail} onClick={this.handleOpen} variant="outlined">
                    <PollOutlinedIcon className={classes.icon} />
                    <Typography variant="h5">
                        { (this.state.poll.question.length <= this.maxLength) ? this.state.poll.question : this.state.poll.question.slice(0, this.maxLength) + '...' }
                    </Typography>                        
                    <Chip className={classes.chip} label={`Votes: ${numVotes}`} variant="outlined" />
                </Card>
                <Popover 
                    className={classes.popover}
                    open={this.state.open}
                    onClose={this.handleClose}
                    anchorEl={this.state.anchor}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }} >
                    <Card className={classes.card}>
                        <Typography className={classes.heading} variant="h5">
                            { this.state.poll.question }
                        </Typography>
                        <Divider className={classes.separator} variant="middle" />
                        {
                            localStorage.getItem('currentUser') ? (this.isLoggedIn()) : this.isAnonymous()
                        }
                        
                    </Card>
                </Popover>
            </React.Fragment>
        )    
    }
}


export default withStyles(styles)(PollsComponent);