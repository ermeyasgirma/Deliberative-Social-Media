import React, { Component } from 'react';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import NavbarComponent from '../../Components/Navbar/Navbar';
import Popup from 'reactjs-popup'; //https://react-popup.elazizi.com/ this library was used 
import CreateSubCategoryComponent from './Create_Sub_Category';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CreatePollComponent from './Create_Poll';
import FileUploadComponent from './FileUpload'

import styles from './forumStyles';
import TopicComponent from './Topic';
import { AuthStateContext } from '../../Context'


/*

   The main forum page component. 

    Fetches polls, sub categories, evidence and introduction for each week under the topic 
    and then passes the data to the topic component to render. 

    Has the UI to move between weeks. 

    Admin buttons are below - to create sub categories and polls. 

*/


class ForumComponent extends Component {

	static contextType = AuthStateContext;
    state = {
        topicId: null,
        name: null,
        creator: null,
        type: null,
        body: null,
        created: null,
        numWeeks: 0,
        subCategories: {},
        evidence: {},
        polls: {}
    }

    weeksBetween(d1, d2) {
        return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000)) + 1;
    }

    generateTabs() {
        const { classes } = this.props;

        const allSubs = [ ...Object.values(this.state.subCategories) ].flat();
        const allEvidence = [ ...Object.values(this.state.evidence) ].flat();
        const allPolls = [ ...Object.values(this.state.polls) ].flat(); 

        let children = [
           <Tab eventKey="all" title="All">
                <TopicComponent key="All"
                                className={classes.topic} 
                                name={this.state.name} 
                                type={this.state.type} 
                                body={this.state.body} 
                                subCategories={allSubs} 
                                resources={allEvidence} 
                                polls={allPolls} 
                                />
           </Tab>
        ];

        for (let i=1; i <= this.state.numWeeks; i++) {
            let week = 'Week ' + i;
          
            children.push(
                <Tab eventKey={'week'+i} title={week}>
                    <TopicComponent key={week}
                                    className={classes.topic} 
                                    name={this.state.name} 
                                    type={this.state.type} 
                                    body={this.state.body} 
                                    subCategories={this.state.subCategories[week]} 
                                    resources={this.state.evidence[week]} 
                                    polls={this.state.polls[week]} 
                                    />
                </Tab>
            );
        }

        return children;
    }

    async componentDidMount(){
        const { topic } = queryString.parse(this.props.location.search);

        if (topic === undefined) {
            this.props.history.push('/timeline')
        }

        this.setState({ topicId: topic });
        
        // GET Topic
        var response = await fetch(`api/Topic/${topic}`);
        var data = await response.json();

        this.setState({
            name: data.name,
            creator: data.creator,
            type: data.type,
            body: data.body,
            created: new Date(data.created),
            numWeeks: this.weeksBetween(new Date(data.created), new Date())
        });

        // GET Sub Categories
        response = await fetch(`api/Sub_Category/Topic/${topic}`);
        data = await response.json();

        let subs = {};

        for (let i=0; i < data.length; i++) {
            data[i].created = new Date(data[i].created);
            let week = this.weeksBetween(this.state.created, data[i].created);
            
            if (!(subs[`Week ${week}`] instanceof Array)) {
                subs[`Week ${week}`] = [];
            }

            subs[`Week ${week}`].push(data[i]);
        }
        
        this.setState({ subCategories: subs });
        
        // GET Media
        response = await fetch(`api/MediaTable/Topic/${topic}`);
        data = await response.json();

        let media = {};

        for (let i=0; i < data.length; i++) {
            data[i].created = new Date(data[i].created);          
            let week = this.weeksBetween(this.state.created, data[i].created);
            
            if (!(media[`Week ${week}`] instanceof Array)) {
                media[`Week ${week}`] = [];
            }

            media[`Week ${week}`].push(data[i]);

        }
        
        this.setState({ evidence: media });

        // GET Polls
        response = await fetch(`api/Poll/Topic/${topic}`);
        data = await response.json();
        
        for (let i=0; i < data.length; i++) {
            const ansResponse = await fetch(`api/Answer/Poll/${data[i].id}`);
            const ansData = await ansResponse.json();
            
            data[i].answers = ansData;
        }

        let polls = {}
        
        for (let i=0; i < data.length; i++) {
            data[i].created = new Date(data[i].created);
            let week = this.weeksBetween(this.state.created, data[i].created);

            if (!(polls[`Week ${week}`] instanceof Array)) {
                polls[`Week ${week}`] = [];
            }

            polls[`Week ${week}`].push(data[i]);
        }

        this.setState({ polls })
    }

    isAdmin = () => {
        return (
            <div> 
                <Popup trigger={<button className="button"> Create Sub Category </button>} modal>
                    <CreateSubCategoryComponent topic_id={this.state.topicId}> </CreateSubCategoryComponent>
                </Popup>
                <Popup
                    closeOnDocumentClick={false}

                    trigger={<button className="button"> Create Poll (Moderator Only) </button>} modal>
                    {close => (
                        <CreatePollComponent topic_id={this.state.topicId} close={close}> </CreatePollComponent>
                    )}
                </Popup>
                <Popup
                    closeOnDocumentClick={false}
                    trigger={<button className="button"> Upload Media (Moderator Only) </button>} modal>
                    {close => (
                        <FileUploadComponent user={2} close={close} topic_id={this.state.topicId} />
                    )}
                </Popup>
            </div>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <NavbarComponent history={this.props.history} />
                <div className={classes.main}>
                    <Tabs className={classes.tabs} defaultActiveKey="all">
                        {
                            this.generateTabs()
                        }
                    </Tabs> 
                    {
                        this.context.user.auth_level === 'Admin' ? this.isAdmin() : null
                    }
                </div>            
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(ForumComponent);
