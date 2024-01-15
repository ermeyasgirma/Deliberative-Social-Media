import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import CommentComponent from './Comment';
import ReplyIcon from '@material-ui/icons/Reply';
import ReactPlayer from 'react-player'
import { updateReaction, AuthDispatchContext, AuthStateContext } from '../../Context'
import SendIcon from '@material-ui/icons/Send';

/*

   The main post component.

   Displays reactions, the main body of the post, the user who created the post. 

   Has the functionality to respond to logged in users reacting to posts and updating the backend. 

    Fetches comments and passes data to the comment component.

*/


class PostComponent extends Component {

    static contextType = AuthStateContext;

    constructor(props){
        super(props);
        this.state = {
            expanded: false, replyExpanded: false, comments: [], Like: false, Dislike: false, CMM: false, data: this.props.data, comment_body: '',
        l : 0, d : 0, c : 0}; 

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleReplyClick = this.handleReplyClick.bind(this);
        this.handleDescriptorClick = this.handleDescriptorClick.bind(this);
        this.delete = this.delete.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.replyComment = this.replyComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        const userInfo = this.context
        const reactions = userInfo.reactions
        const reaction = reactions[this.state.data.id]
        if (reaction){
            const reacted1 = reaction[0]['reacted']
            this.setState({[reacted1]:true})
            if (reaction.length > 1){
            const reacted2 = reaction[1]['reacted']
            this.setState({[reacted2]:true})
            }
        }   
    }

    handleReplyClick() {
        const value = !this.state.replyExpanded;
        this.setState({replyExpanded:value});
    }


    async handleExpandClick() {
        
        this.fetchComments();

        const value = !this.state.expanded;
        this.setState({expanded:value});
      };
    
    async fetchComments(){

        const response = await fetch('api/Comment/Post/'+this.state.data.id);
        const data = await response.json();
        const finaldata = []
        data.forEach(element => {
            if (element.parentCommentId == null){
                finaldata.push(element)
            }
        });
        this.setState({
            comments: finaldata
          });

    }

    async delete() {

        const user = this.context;
        const token = user.token

        await fetch('api/Post/' + this.state.data.id, { method: 'DELETE', headers: { 'Authorization': "Bearer " + this.context.token } });
        alert("post deleted")
        this.props.refresh();
    }


    async handleDescriptorClick(event, dispatch) {

        const name = event.currentTarget.name;
        const val = this.state[name];

        if (val == true){
            if (name == "Like") {      
                this.state.data["likes"] = this.state.data["likes"] - 1           
            }
            if (name == "CMM") {      
                this.state.data["cmm"] = this.state.data["cmm"] - 1           
            }
            if (name == "Dislike") {      
                this.state.data["dislikes"] = this.state.data["dislikes"] - 1           
            }
            this.setState({ [name]: false })

        } else {

            this.setState({ [name]: true })

            if (name == "Like") {                 
                if (this.state["Dislike"] == true) {
                    this.setState({ "Dislike": false })
                    this.state.data["dislikes"] = this.state.data["dislikes"] - 1
                }
                this.state.data["likes"] = this.state.data["likes"] + 1
            }

            if (name == "Dislike") {
                if (this.state["Like"] == true) {
                    this.setState({ "Like": false })
                    this.state.data["likes"] = this.state.data["likes"] - 1
                }
                this.state.data["dislikes"] = this.state.data["dislikes"] + 1

            }

            if (name == "CMM") {
                this.state.data["cmm"] = this.state.data["cmm"] + 1
            }

        }

        const userInfo = this.context;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.context.token},
            body: JSON.stringify({PostId: this.state.data.id, PersonName: userInfo.user.username, Reacted: name})
        };

        const response = await fetch('api/Reaction', requestOptions);
        let res = await updateReaction(dispatch, this.context.token, this.context.user.username);
    }


    handleInputChange(event){
        this.setState({comment_body: event.target.value});
    }

    async replyComment(){

        const user = this.context;
        const token = user.token
        const username = user.user.username

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': "Bearer " + token  },
            body: JSON.stringify({ Body: this.state.comment_body, PostId: this.state.data.id, Creator: username })
        };

        this.handleReplyClick();

        await fetch('api/Comment', requestOptions);
        alert('Comment Registered');
        this.fetchComments();
    }

    render() {

        return(
            <div>
                <Card>
                    <CardContent >
                    <AuthDispatchContext.Consumer>
                    {dispatch=> (
                        <div>
                    <Typography color={this.state.data.flag ? "error" : "textPrimary"} variant='h6'>
                    {this.state.data.flag ? "CONTENT WARNING : REDACTED" : this.state.data.body}
                    </Typography>
                    <Typography color="textSecondary" variant='body1'>
                    By: {this.state.data.creator}
                    </Typography>
                    <div className='row'> 
                    {(this.state.data.hasMedia) 
                            ? (this.state.data.mediatype === 'Picture') 
                                ? <img width="400" height="200" src={this.state.data.media} />
                                : <ReactPlayer controls={true} url={this.state.data.media}/>
                            : <img width="400" height="200" src={"https://www.theparliamentmagazine.eu/siteimg/news-main/ugc-1/fullnews/news/22098/21278_original.jpg"} />}
                    </div>

                    <IconButton color={this.state.Like ? "primary": "default"} onClick={(event) => {this.handleDescriptorClick(event, dispatch)}} name="Like">
                    <ThumbUpAltIcon />
                    <h6> {this.state.data.likes} </h6>
                    </IconButton>
                    
                    <IconButton color={this.state.Dislike ? "primary": "default"} onClick={(event) => {this.handleDescriptorClick(event, dispatch)}} name="Dislike">
                    <ThumbDownIcon />
                    <h6> {this.state.data.dislikes}</h6> 
                    </IconButton>

                    <IconButton color={this.state.CMM ? "primary": "default"} onClick={(event) => {this.handleDescriptorClick(event, dispatch)}} name="CMM">
                    <WbIncandescentIcon />
                    <h6> {this.state.data.cmm}</h6>
                    </IconButton>
                    
                    { (localStorage.getItem('currentUser')) ?
                        <IconButton color="default" onClick={this.handleReplyClick} name="Reply">
                        <ReplyIcon/>
                        </IconButton>
                        : null
                    }
                    
                    { (this.context.user.auth_level === 'Admin') ?  
                        <IconButton color="default" onClick={this.delete} name="Delete">
                            <DeleteIcon />
                        </IconButton>
                        : null
                    }
                    </div>
                        )}
                        </AuthDispatchContext.Consumer>
                    
                    <br></br>

                    <label>Discussion</label>
                    <IconButton onClick={this.handleExpandClick} >
                    <ExpandMoreIcon />
                    </IconButton>


                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    
                        <CardContent>                
                        {this.state.comments.map(value => {
                            return <CommentComponent data={value} PostId={this.state.data.id} refresh={this.fetchComments}/>
                        })}
                        </CardContent>
                        </Collapse>
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
                    </CardContent>
                </Card>
            </div>
        )
    }
}


export default PostComponent;