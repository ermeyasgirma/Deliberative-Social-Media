import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import { AuthStateContext } from '../../Context'
import { post } from 'axios';  

/*
	File upload component used for uploading media (photos or videos)

	This is specifically to upload media for posts. 
*/


class MediaUploadComponent extends Component {

	static contextType = AuthStateContext;
	state ={
		files:null,
		history:this.props.history
	}
    

  constructor(props, context) {
	super(props, context);
	this.onFormSubmit = this.onFormSubmit.bind(this)
	this.onChange = this.onChange.bind(this)
	this.uploadDocuments = this.uploadDocuments.bind(this)
	this.data = this.context
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.uploadDocuments();
  }

  onChange(e) {
    this.setState({files:e.target.files})
  }

	uploadDocuments() {
		var data = new FormData();
		data.append('files', this.state.files[0])
		const config = {    
			headers: {    
					'content-type': 'multipart/form-data', 
					'Authorization': "Bearer " + this.context.token    
			},    
		}
		return post( "/api/Media/Upload?topicId=0", data, config);
	}
  

    render() {
		const { classes } = this.props;
		return (
			<div className={classes.main}>
	  			<Paper className={classes.paper}>
				  	<div className='row'>
						<Typography className={classes.heading} component="h1">
							File Upload
						</Typography>
						<IconButton className={classes.closeButton} onClick={() => {this.props.close();}}>
						<CancelIcon />
						</IconButton>
					</div>
					<form className={classes.form} onSubmit={this.onFormSubmit}>
						<FormControl fullWidth margin="normal">
							<input type="file" required={true} multiple={false} onChange={e => this.onChange(e)} />
						</FormControl>
						<FormControl fullWidth margin="normal">
							<button type="submit" className={classes.submit}>Upload</button>
						</FormControl>
					</form>
				</Paper>
			</div>
		)	
	}
}

export default withStyles(styles)(FileUploadComponent);

