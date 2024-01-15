import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { AuthStateContext } from '../../Context'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import ReactPlayer from 'react-player'

import styles from './pollStyles';


/*

    Displays the resources on the forum page for each topic. 

    Data passed to it by it's parent component - Topic.js
    
    Functionality to open and view each resource - any sort of media 
*/

class ResourceComponent extends Component {

    state = {
        resource: this.props.resource,
        selected: null,
        open: false,
        anchor: null
    }
      
    static contextType = AuthStateContext;

    data = this.context
    maxLength = 30;
      

    async handleChange(aid, atext) {}

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

    render() {
        const { classes } = this.props;

        if (!this.props.resource || this.props.resource.length==0){return;}
        return (
            <React.Fragment>
                <Card className={classes.thumbnail} onClick={this.handleOpen} variant="outlined">
                    <PollOutlinedIcon className={classes.icon} />
                    <Typography variant="h5">
                        { this.state.resource.type }
                    </Typography>                        
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
                            { this.state.resource.type }
                        </Typography>
                        <Divider className={classes.separator} variant="middle" />
                        
                        {
                            (this.state.resource.type === 'Picture') 
                            ? <img width="400" height="200" src={this.state.resource.body} />
                            : <ReactPlayer controls={true} url={this.state.resource.body}/>
                        }
                    </Card>
                </Popover>
            </React.Fragment>
        )    
    }
}

export default withStyles(styles)(ResourceComponent);