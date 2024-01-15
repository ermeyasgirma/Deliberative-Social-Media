import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NavbarComponent from '../../Components/Navbar/Navbar';
import { AuthStateContext } from '../../Context';
import styles from './styles';

/*

    Creates the history page allowing users to view any posts or comments they have made with the current account.

    Only accessible to users who are signed in.

    Contains two tabs: one for posts and one for comments.
    Inside each tab posts/comments are displayed in a list in the same order as they were created.

*/

class HistoryComponent extends Component {


    state = {
        postHistory: [],
        commentHistory: []
    }

    static contextType = AuthStateContext;

    async componentDidMount() {
        const name = this.context.user.username;
        const response = await fetch("api/Post/Creator/" + name);
        const fetchedPost = await response.json();
        this.setState({ postHistory: fetchedPost });
        const response2 = await fetch("api/Comment");
        const fetchedComment = await response2.json();
        this.setState({ commentHistory: fetchedComment });
    }

    async fetchPosts() {
        const name = this.context.user.username;
        const response = await fetch("api/Post/Creator/" + name);
        const fetchedPost = await response.json();
        this.setState({ postHistory : fetchedPost});
    } 

    async fetchComments() {
        const response2 = await fetch("api/Comment");
        const fetchedComment = await response2.json();
        this.setState({ commentHistory: fetchedComment});
    }

    
    loadPosts() {
        const userPosts = [];
        const userData = this.context;
        const p = this.state.postHistory;
        for (var x = 0; x < p.length; x++) {
                userPosts.push(
                    <div>
                        <h4>Post {userPosts.length + 1} :</h4>
                        {p[x].body}
                        <br></br>
                        <img style={{ height: '300px', width: '450px' }} src="https://www.theparliamentmagazine.eu/siteimg/news-main/ugc-1/fullnews/news/22098/21278_original.jpg" />
                        <br></br>
                        Likes : {p[x].likes} {"   "}
                              Dislikes : {p[x].dislikes} {"   "}
                                       Cmm : {p[x].cmm}
                    </div>
                );
        }
        if (userPosts.length == 0) {
            userPosts.push(<h3>No posts</h3>);
            userPosts.push(<br></br>);
        }
        return userPosts;
    }

    loadComments() {
        const userComments = [];
        const userData = this.context;
        const c = this.state.commentHistory;
        for (var y = 0; y < c.length; y++) {
            if (c[y].creator == userData.user.username) {
                userComments.push(
                    <div>
                        <h4>Comment {userComments.length + 1} : </h4>
                        {c[y].body}
                        <br></br>
                        <br></br>
                    </div>
                );
            }
        }
        if (userComments.length == 0) {
            userComments.push(<h3>No comments</h3>);
            userComments.push(<br></br>);

        }
        return userComments;
    }

    render() {
        const data = this.context;


        return (
            <React.Fragment>
                <NavbarComponent history={this.props.history} />
                <br></br>
                <div>
                    <Grid>
                    <div ><center> <Avatar variant="rounded" src="userimage.jpg">{data.user.username.charAt(0)}</Avatar></center></div>
                    </Grid>
                    <br></br>
                    <Grid><center><h5>
                        Username   :    {data.user.username}
                    </h5></center></Grid>
                </div>
                <Tabs defaultActiveKey="Posts">
                    <Tab eventKey="Posts" title="Posts">
                        <br></br>
                        <center>
                            {this.loadPosts()}
                        </center>
                    </Tab>                        
                    <Tab eventKey="Comments" title="Comments">
                        <br></br>
                        <center>
                            {this.loadComments()}
                        </center>
                    </Tab>
                </Tabs>

            </React.Fragment>
        );

    }

}

export default withStyles(styles)(HistoryComponent);