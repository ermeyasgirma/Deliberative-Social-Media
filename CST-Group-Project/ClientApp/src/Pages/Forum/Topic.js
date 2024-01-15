import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PollsComponent from './Polls';
import ResourceComponent from './Resource';
import { Scrollbars } from 'react-custom-scrollbars';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SubCategoryComponent from './Sub_Category';
import Carousel from 'react-material-ui-carousel';
import styles from './topicStyles';

/*

   Receives the data from index.js via props. 

    Displays the evidence, sub categories, polls and introduction.

    Is the parent of the sub category popup which allows users to interact within sub categories.
*/


class TopicComponent extends Component {
    state = {
        name: null,
        bodyType: null,
        body: null,
        subCatIndex: 0,
        subCategories: {},
        resources: {},  
        polls: {},
        selected: null,
        open: false,
        anchor: null
    }


    static getDerivedStateFromProps(nextProps, state) {
        return ({
            name: nextProps.name,
            bodyType: nextProps.type,
            body: nextProps.body,
            subCategories: nextProps.subCategories,
            resources: nextProps.resources,
            polls: nextProps.polls
        });
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

    handleAccordion = (type) => {
        switch (type) {
            case 'description':
                this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
                break;
                
            case 'resources':
                this.setState({ resourcesExpanded: !this.state.resourcesExpanded });
                break;

            case 'polls':
                this.setState({ pollsExpanded: !this.state.pollsExpanded });
                break;

            case 'comments':
                this.setState({ commentsExpanded: !this.state.commentsExpanded });
                break;

            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div id="topic" className={classes.main}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} variant="h1">
                            { this.state.name }
                        </Typography>
                        
                        <Divider className={classes.separator} variant="middle" />

                        <Grid className={classes.grid} container spacing={3}>
                            <Grid item xs={6}>
                                <Card className={classes.card} variant="outlined">
                                    <Typography className={classes.subheading} variant="h5">Introduction</Typography>
                                    <CardContent className={classes.body}>
                                        <Scrollbars>
                                            <Typography variant="subtitle1">{ this.state.body }</Typography>
                                        </Scrollbars>
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Grid className={classes.grid} container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card className={classes.card} variant="outlined">
                                            <Typography className={classes.subheading} variant="h5">Resources</Typography>
                                            <CardContent className={classes.body}>
                                                <Scrollbars>
                                                {
                                                        (this.state.resources && this.state.resources.length > 0) 
                                                        ? this.state.resources.map(r => {
                                                                return (
                                                                (r.postId === null) 
                                                                ? <ResourceComponent resource={r}/>
                                                                : null
                                                            )})
                                                        : null
                                                }
                                                </Scrollbars>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Card className={classes.card} variant="outlined">
                                            <Typography className={classes.subheading} variant="h5">Polls</Typography>
                                            <CardContent className={classes.body}>
                                                <Scrollbars>
                                                {
                                                        (this.state.polls && this.state.polls.length > 0) ?
                                                            this.state.polls.map(p => {
                                                                return <PollsComponent topic={p.topicId} poll={p}/>
                                                            })
                                                        : null
                                                }
                                                </Scrollbars>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>                    
                    </Paper>
                </div> 

                { (this.state.subCategories && this.state.subCategories.length > 0) ?
                        <Carousel className={classes.subcategoryCarousel} cycleNavigation={false} autoPlay={false}>
                                {
                                    this.state.subCategories.slice(0,Math.ceil((this.state.subCategories.length)/2)).map((category, index) => {
                                        return (
                                            index+2 <= this.state.subCategories.length ? 
                                                <div class='row'>
                                                    <SubCategoryComponent key={this.state.subCategories[index].id} data={this.state.subCategories[index]}/>
                                                    <div className={classes.subcat}></div>
                                                    <SubCategoryComponent key={this.state.subCategories[index+1].id} data={this.state.subCategories[index+1]}/>
                                                    </div>
                                                    :
                                                    <div class='row'>
                                                    <SubCategoryComponent  key={this.state.subCategories[index].id} data={this.state.subCategories[index]}/>
                                                </div>
                                                )
                                            })
                                }
                        </Carousel>

                    : null
                } 
            </React.Fragment>
        );
   }   
}
 
export default withStyles(styles)(TopicComponent);