import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SendIcon from '@material-ui/icons/Send';
import ShareIcon from '@material-ui/icons/Share';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import Popup from 'reactjs-popup'; //https://react-popup.elazizi.com/ this library was used 
import NavbarComponent from '../../Components/Navbar/Navbar';
import { AuthStateContext } from '../../Context';
import CreateDebateTopicComponent from '../Forum/Create_Debate_Topic';
import { getImage } from "./GetBatch";
import styles from './TimelineStyle.js';


/*

    Creates the timeline page containing a card for each topic.

    Topics are fetched from the database and displayed in a grid of cards.
    Each card contains an image, a title, the number of weeks the topic has been active for, and a share link.

    Users can navigate to topic pages by clicking anywhere on the card, and clicking on the home button on the navbar returns the user to this page.

    (This is the landing page for the site)
*/

export class TimelineComponent extends Component {

    static contextType = AuthStateContext;
    
    state = {
        numTopics: 0,
        topicsToLoad:4,
        hasMoreTopics: true,
        topics: [],
        shareOpen: false,
        addOpen:false,
        addTopicId:null,
        shareId: null,
        shareTopic: null,
        snackbarOpen: false,
        fetched:false,
        boundary:0,
        vettedUsername:''
    }

    forum = (e, id) => this.props.history.push({
                            pathname: '/forum',
                            search: '?topic=' + id
                        });

    profile = () => this.props.history.push('/profile');

    componentDidMount(){
       this.fetchPosts()
       this.setState({fetched:true})
    }
    
    async fetchPosts() {

        if (!this.state.fetched){

            const userinfo = this.context;

            let response = ''
            if (this.context.user.auth_level === 'Admin'){
                response = await fetch('api/Topic')
            }else{
                response = await fetch("api/LinkUserTopic/Person/"+userinfo.user.username+"?limit="+this.state.topicsToLoad+"&boundary="+this.state.boundary);
            }

            const data = await response.json();
            if (data.length < 4){
                this.setState({hasMoreTopics:false})
            }
            const newdata = this.state.topics.concat(data)
            this.setState({ topics: newdata });
            const lastTopicId = this.state.topics[this.state.topics.length-1].id
            this.setState({boundary:lastTopicId});
        }

        this.setState({fetched:false})

        return true
    }  

    async addUser(e) {

        this.Createlinks(this.state.vettedUsername, this.state.addTopicId);

    }

    async Createlinks(vettedUsername, addTopicId){
        const ulist = vettedUsername.split(',')

        await Promise.all(ulist.map(async (name) => {
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.context.user.token},
                body: JSON.stringify({ PersonName: name, TopicId: addTopicId})
            };

            const res = await fetch('api/LinkUserTopic', requestOptions)

        }))

        this.handleAddClose();
    }

    numWeeks = (topic) => {
        return Math.floor((new Date() - new Date(topic.created)) / (7 * 24 * 60 * 60 * 1000)) + 1;
    }

    handleShareOpen = (e, id) => {
        e.stopPropagation();

        this.setState({
            shareOpen: true,
            shareId: id,
            shareTopic: e.currentTarget
        });
    }

    handleAddOpen = (e, id) => {
        e.stopPropagation();

        this.setState({
            addOpen: true,
            addTopicId:id,
            shareTopic: e.currentTarget
        });
    }


    handleAddClose = (e) => {
        e.stopPropagation();

        this.setState({
            addOpen: false,
            addTopicId:null
        });
    }

    handleShareClose = (e) => {
        e.stopPropagation();

        this.setState({
            shareOpen: false,
            shareTopic: null
        });
    }

    handleCopy = (e) => {
        e.stopPropagation();

        navigator.clipboard.writeText(`${window.location.host}/forum?topic=${this.state.shareId}`);
        this.setState({
            snackbarOpen: true
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false
        });
    }

    loadMore() {
    }

    render() {
        const classes = this.props.classes;
        
        return (
            <div style={{overflow: 'hidden'}}>
                <NavbarComponent history={this.props.history} />

                { (this.context.user.auth_level === 'Admin') ? 
                    <Popup
                        closeOnDocumentClick={false}
                        trigger={
                            <Button className={classes.createTopic}
                                variant="contained"
                            >
                                Create Debate Topic...
                            </Button>
                        } modal>
                        {close => (
                        <CreateDebateTopicComponent close={close}> </CreateDebateTopicComponent>
                        )}
                    </Popup>
                    : null
                }
                
                <InfiniteScroll
                    loadMore={() => this.loadMore()}
                    hasMore={this.state.hasMoreTopics}
                    threshold={0}
                > 
                    <Grid className={classes.grid} container spacing={5}>
                        {
                            this.state.topics.map(topic => {
                                return(
                                    <Grid item xs={6}>
                                        <Card className={classes.card} onClick={(e) => this.forum(e, topic.id)} >
                                            <CardMedia
                                                className={classes.cardMedia}
                                                component="img"
                                                image={getImage(topic.id)}
                                                title={topic.name}
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography className={classes.heading} variant="h1">
                                                    { topic.name }
                                                </Typography>
                                                {topic.openFlag == false ? <Typography variant='body1'>Vetted topic</Typography> : <div></div>}
                                            </CardContent>
                                            <Divider className={classes.separator} />
                                            <CardActions className={classes.cardActions}>
                                                <Grid className={classes.icons} container spacing={1}>
                                                    <Grid className={classes.weeks} item xs={4}>
                                                        <DateRangeIcon className={classes.weeksIcon} />
                                                        <Typography variant="h5" align="center" display="inline">
                                                            { (this.numWeeks(topic) === 1) ?  '1 week' : `${this.numWeeks(topic)} weeks` }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs ={6}>
                                                    { (this.context.user.auth_level === 'Admin' && topic.openFlag == false) ? 
                                                        <Button onClick={(e) => this.handleAddOpen(e, topic.id)}>
                                                            <AddIcon className={classes.shareIcon} />
                                                        </Button> : <div></div> }
                                                        <Popover
                                                            className={classes.popover}
                                                            open={this.state.addOpen}
                                                            onClose={this.handleAddClose}
                                                            anchorEl={this.state.shareTopic}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'center',
                                                            }}
                                                        >
                                                            <Card className={classes.shareCard} variant="outlined" onClick={(e) => e.stopPropagation()}>
                                                                <Box className={classes.box} borderRadius={16} borderColor="#9F5AA2" m={1} border={3}>
                                                                    <Typography variant='body2'> Enter List of comma seperated Usernames to allow access to topic</Typography>
                                                                <TextField
                                                                        id="username-input"
                                                                        name="vettedUsername" variant='outlined' type="text"
                                                                        onChange={(e)=> {this.setState({vettedUsername: e.target.value})}}/>  
                                                                </Box>
                                                                {
                                                                    <Button onClick={(e) => {this.addUser()}} ><SendIcon className={classes.copyIcon} /></Button>
                                                                }
                                                            </Card>
                                                        </Popover>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Button onClick={(e) => this.handleShareOpen(e, topic.id)}>
                                                            <ShareIcon className={classes.shareIcon} />
                                                        </Button>
                                                        <Popover
                                                            className={classes.popover}
                                                            open={this.state.shareOpen}
                                                            onClose={this.handleShareClose}
                                                            anchorEl={this.state.shareTopic}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'center',
                                                            }}
                                                        >
                                                            <Card className={classes.shareCard} variant="outlined" onClick={(e) => e.stopPropagation()}>
                                                                <Box className={classes.box} borderRadius={16} borderColor="#9F5AA2" m={1} border={3}>
                                                                    <Typography variant="h5">{ `${window.location.host}/forum?topic=${this.state.shareId}` }</Typography>
                                                                </Box>
                                                                {
                                                                    <Button onClick={this.handleCopy}><FileCopyIcon className={classes.copyIcon} /></Button>
                                                                }
                                                            </Card>
                                                        </Popover>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                   </Grid>
                   {this.state.hasMoreTopics ? 
                        <Grid container spacing={5}>
                            <Grid item xs={5}>
                                <IconButton onClick={(e)=> {this.fetchPosts()}}>
                                <AddIcon className={classes.moreIcon}  />
                                </IconButton>
                            </Grid>
                        </Grid>
                            :
                        <Typography className={classes.noMore} variant="h3"> No more posts to fetch :(</Typography>
                    }
                </InfiniteScroll>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <MuiAlert className={classes.copyMessage} elevation={6} variant="filled" onClose={this.handleSnackbarClose} >
                        Link Copied!
                    </MuiAlert>
                </Snackbar>                
            </div>
                

        );
    }
}
export default withStyles(styles)(TimelineComponent);