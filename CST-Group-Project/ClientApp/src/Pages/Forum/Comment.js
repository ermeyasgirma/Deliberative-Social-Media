import React, { Component } from 'react';
import Popup from 'reactjs-popup'; //https://react-popup.elazizi.com/ this library was used 
import { AuthStateContext } from '../../Context'
import ReplyIcon from '@material-ui/icons/Reply';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './commentStyles';
import Divider from '@material-ui/core/Divider';

/*

    Creates the box underneath the post containing comments.

    Comments are fetched for the post it inherits from (Post.js)

    Functionality to reply and delete (your own) comments is provided via drop downs here in this page if you are logged in. 
*/

class CommentComponent extends Component {
    
    constructor(props){
        super(props);
        this.state = {body:'', data:this.props.data, replyExpanded:false, comments:[]}
        this.deleteComment = this.deleteComment.bind(this);
        this.replyComment = this.replyComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReplyClick = this.handleReplyClick.bind(this);
        this.fetchComments = this.fetchComments.bind(this)
    }

    static contextType = AuthStateContext;

    async componentDidMount() {
        this.fetchComments();
    }

    async fetchComments(){

        const response = await fetch('api/Comment/Post/'+this.props.PostId);
        const data = await response.json();
        const finaldata = []
        data.forEach(element => {
            if (element.parentCommentId == this.state.data.id){
                finaldata.push(element)
            }
        });
        this.setState({
            comments: finaldata
          });
    }

    handleInputChange(event){
        this.setState({body: event.target.value});
    }

    handleReplyClick() {
        this.fetchComments();
        const value = !this.state.replyExpanded;
        this.setState({replyExpanded:value});
    }

    async deleteComment() {
        const userInfo = this.context;
        const token = userInfo.token;
        await fetch('api/Comment/'+this.state.data.id, {method: 'DELETE', headers:{'Authorization': "Bearer " + token}});
        alert("comment deleted")
        this.props.refresh();
    }

    loadDeleteComment() {
        const button = [];
        const userInfo = this.context;
        const commentCreator = this.state.data.creator;
        const currentUser = userInfo.user.username;
        if (commentCreator == currentUser) {
            button.push(
                <IconButton size='small'  onClick={this.deleteComment}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            );
        }
        return button[0];
    }

    async replyComment(){

        const userInfo = this.context;
        const token = userInfo.token;
        const currentUser = userInfo.user.username;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
            body: JSON.stringify({ Body: this.state.body, PostId: this.props.PostId, ParentCommentId: this.state.data.id, Creator: currentUser })
        };


        const res = await fetch('api/Comment', requestOptions);

        alert('Comment Registered');
        
        this.props.refresh();
    }
    
    isLoggedIn() {
        return (
            <Collapse in={this.state.replyExpanded}>
                {
                    <div>
                        <input type="text" value={this.state.comment_body} onChange={this.handleInputChange} />
                        <IconButton onClick={() => { this.replyComment(); }}>
                            <SendIcon></SendIcon>
                        </IconButton>
                    </div>
                }
            </Collapse>
            );
    }

    render(){
        const { classes } = this.props;

        return(
            <div>
                <div class='row'>
                <Typography variant='caption'> <u>{this.state.data.creator} </u> </Typography>
                </div>

                <div class='row' style={{marginBottom:'3%'}}>
 
                <Typography variant='body1' style={{marginTop:'1.5%'}} > {this.state.data.body} </Typography> 
                {this.loadDeleteComment()}

                <IconButton size='small' onClick={this.handleReplyClick} >
                        {this.state.replyExpanded ? <ExpandLessIcon/> : <ReplyIcon /> }
                    </IconButton>

                    </div>
                {
                    localStorage.getItem('currentUser') ? this.isLoggedIn() : <br></br>
                }
                <div style={{marginLeft:'5%'}}>
                {this.state.comments.map(comment => {
                    return ( <CommentComponent data={comment} PostId={this.props.PostId} refresh={this.props.refresh}/>)
                })}
                <Divider ></Divider>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(CommentComponent);