import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles'
import { AuthStateContext } from '../../Context'


/*

    The form inside the popup to create a sub category.  

    The popup is only displayed on the forum component for admins - and the post request needs an admin token.

    Creates a sub category for that specific forum topic (and week).
    
*/


class CreateSubCategoryComponent extends Component {

    static contextType = AuthStateContext;

    constructor(props) {
        super(props);
        this.state = {sub_category: '', description:''};
        this.topic_id = this.props.topic_id;
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }
    
      async handleSubmit(e) {
        e.preventDefault();

        alert('A sub category was created: ' + this.state.sub_category);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.context.token },
            body: JSON.stringify({ Parent: this.topic_id, Name: this.state.sub_category, Description: this.state.description }) 
        };

        const response = await fetch('api/Sub_Category', requestOptions);

        window.location.reload(false);
      }

    render() {
      const { classes } = this.props;

        return (

          <div>
          <CssBaseline />
          <Paper className={classes.paper}>
              <div class='row'>
              <Typography className={classes.heading} component="h1">
                  Create Sub Category
              </Typography>
              </div>
              <form className={classes.form} onSubmit={this.handleSubmit}>

                      <FormControl fullWidth margin="normal">
                          <TextField
                              id="sub-category-input"
                              name="sub_category"
                              label="Sub Category Name"
                              variant="outlined"
                              type="text"
                              onChange={this.handleChange}
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
                          <TextField
                              id="sub-category-description-input"
                              name="description"
                              label="Sub Category Description"
                              variant="outlined"
                              type="text"
                              onChange={this.handleChange}
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

                      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                  </form>
          </Paper>
          </div>
 

        );
    }
}

export default withStyles(styles)(CreateSubCategoryComponent);