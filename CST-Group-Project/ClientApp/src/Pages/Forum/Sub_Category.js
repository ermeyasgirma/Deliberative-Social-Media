import React, { Component } from 'react';
import PostComponent from './Post'
import IconButton from '@material-ui/core/IconButton';
import CreatePostComponent from './Create_Post';
import Popup from 'reactjs-popup'; //https://react-popup.elazizi.com/ this library was used 
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import styles from './subcategoryStyles';


/*

   The main sub category page component.

    Fetches all the posts and displays them (passing the data to the post component).

    Also has an introduction.

*/


class SubCategoryComponent extends Component {


    constructor(props){
        super(props)
        this.state = {index:0, posts:[], expanded:false, data:this.props.data, open: false, descriptionExpanded: true, resourcesExpanded: false, commentsExpanded: false};
        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
        this.handleExpandClick = this.handleExpandClick.bind(this);

    }

    handleExpandClick() {
        const value = !this.state.expanded;
        this.setState({expanded:value});
      };

    async fetchPosts(){

        const response = await fetch('api/Post/Sub_Category/'+this.state.data.id);
        const data = await response.json();
        for (const i in data) { 
            var post = data[i]
            if (post.hasMedia) {
                const medresponse = await fetch('api/MediaTable/Post/' + post.id);
                const meddata = await medresponse.json();
                post.media = meddata[0].body;
                post.mediatype = meddata[0].type;
            }
        }

        this.setState({
            posts: data,
            description: this.state.data.description
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleAccordion = (type) => {
        switch (type) {
            case 'description':
                this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
                break;
                
            case 'resources':
                this.setState({ resourcesExpanded: !this.state.resourcesExpanded });
                break;

            case 'comments':
                this.setState({ commentsExpanded: !this.state.commentsExpanded });
                break;

            default:
                break;
        }
    }

    loggedIn() {
        const { classes } = this.props;
        return (
            <div>
                <Popup className={classes.popup} closeOnDocumentClick={false}
                    trigger={<IconButton color='primary'> <AddIcon /> </IconButton>} modal>
                    {close => (
                        <CreatePostComponent user={2} topic_id={1} sub_category_id={this.state.data.id}

                            refresh={this.fetchPosts} close={close}>
                        </CreatePostComponent>
                    )}
                </Popup>
            </div>
            );
    }
    

    render() {

        const { classes } = this.props;
      
        return (
            <React.Fragment>
                <Card className={classes.thumbnail} onClick={this.handleOpen}>
                
                    <Grid className={classes.grid} container spacing={2}>
                                <Grid item xs={5}></Grid>
                                <Grid item xs={5}>
                                <Typography className={classes.thumbnailTitle} type="h1" variant="subtitle1">{ this.state.data.name }</Typography>
                                </Grid>
                                <Grid item xs={2}>
                            {
                                localStorage.getItem('currentUser') ? this.loggedIn() : <br></br>
                                    }
                                </ Grid>
                                </Grid>
                    
                        <Divider className={classes.separator} variant="middle" />
                    <Typography className={classes.thumbnailDescription}>
                        {
                        (this.state.description ? this.state.description.substring(0, 250) : '') + '...'
                        }
                    </Typography>
                </Card>
                <Modal
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    BackdropProps= {{
                        classes: {
                            root: classes.backdrop
                        }
                    }}
                >
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <Typography className={classes.heading} variant="h1">
                                { this.state.data.name }
                            </Typography>
                            <Divider className={classes.separator} variant="middle" />


                            <Accordion className={classes.accordion} expanded={this.state.descriptionExpanded} onChange={() => this.handleAccordion('description')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id="description-header"
                                >
                                    <Typography component="h4" variant="h6">Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className={classes.description}  paragraph>
                                        { (this.state.description) ? this.state.description : null }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        <Grid className={classes.postGrid} container spacing={3}>
                        {this.state.posts.map(value => {
                            return  <Grid item xs={6}>
                                        <PostComponent className={classes.post} data={value} refresh={this.fetchPosts}/>
                                    </Grid>
                        })}
                        </Grid>
                        </Card>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(SubCategoryComponent);