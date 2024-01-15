import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles'
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { AuthStateContext } from '../../Context'
import { post } from 'axios';  


/*

    The form inside the popup to create a post.

    The popup is triggered by the add button on the sub category for logged in users - inherits from it. 

    Creates a post, with media and or Text - under that specific sub category.

*/


class CreatePostComponent extends Component {

    static contextType = AuthStateContext;

    constructor(props) {
        super(props);

        this.user = this.props.user;
        this.state = {type:'TEXT', content: '', caption:'', sub_category_id:this.props.sub_category_id, comments_enabled:true, files:null, containsFile:false};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitFile = this.submitFile.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
      }
      
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      handleFileChange(event) {
        this.setState({files:event.target.files})
        this.setState({containsFile:true})
      }

      async submitFile(postId){
        var fileData = new FormData();
		fileData.append('files', this.state.files[0])
		const config = {    
			headers: {    
					'content-type': 'multipart/form-data', 
					'Authorization': "Bearer " + this.context.token    
			},    
		}
		return post( "/api/Media/Upload?postId=" + postId, fileData, config);
      }
    
      async handleSubmit(event) {

        event.preventDefault();

        const user = this.context;
        const token = user.token
        const username = user.user.username



        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
            body: JSON.stringify({ Body: this.state.content, Subcategory: this.state.sub_category_id, 
              Type:this.state.type, Creator: username, HasMedia:this.state.containsFile}) 
        };

        var reqPost = await fetch('api/Post', requestOptions);
        var postData = await reqPost.json();

        if (this.state.files != null) { this.submitFile(postData.id) }
        
        this.props.refresh();
        this.props.close();
      }

    render() {
      const { classes } = this.props;
      const types = ['TEXT', 'PICTURE', 'VIDEO']
        return (
          <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <div class='row'>
                    <Typography className={classes.heading} component="h1">
                        Create Post
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={() => {this.props.close();}}>
                    <CancelIcon />
                    </IconButton>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>                                 

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="content-input"
                                    name="content"
                                    variant="outlined"
                                    type="text"
                                    label="Content of Post"
                                    onChange={this.handleInputChange}
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

                            <FormControl fullWidth margin="normal">
                            <FormControlLabel
                                label={this.state.comments_enabled ? "Comments Enabled" : "Comments Disabled"}
                                control={
                                  <Switch
                                    checked={this.state.comments_enabled}
                                    onChange={() => {this.setState({comments_enabled: !this.state.comments_enabled})}}
                                    color="primary"
                                    />
                                }
                              />
                            
                            </FormControl>
                            <input type="file" required={false} multiple={false} onChange={e => this.handleFileChange(e)} />
                            

                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                        </form>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CreatePostComponent);