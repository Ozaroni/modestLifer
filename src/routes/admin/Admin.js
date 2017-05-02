/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
require('../../../node_modules/last-draft/lib/styles/ld.css')

require('../../../node_modules/last-draft/lib/styles/draft.css')

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
var firebase = require('firebase');

import UserStore from "../../data/stores/UserStore"
import PostStore from "../../data/stores/PostStore"
import history from '../../history';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateFromText, editorStateToJSON} from 'last-draft'

import video from 'ld-video'
import html from 'ld-html'

let plugins = [video, html]

let basePost = "Add Post Content Here!"
let baseExcerpt = "Add Post Excerpt Here!"

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL_POST_STATE = editorStateFromText(basePost)
    const INITIAL_EXCERPT_STATE = editorStateFromText(baseExcerpt)
    this.state = { 
      value: INITIAL_POST_STATE,
      excerpt: INITIAL_EXCERPT_STATE, 
      user: UserStore.getUser(),
      categoryValue: 0, 
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  componentWillMount = () => {
    UserStore.on('userChanged', this._updateUser);
    //PostStore.getCategories()
  }
  _updateUser = () => {
    console.log("Updating User")
    if(UserStore.getUser() == null){
      history.push({pathname: '/login'})
    }else{
      if(UserStore.getUser() != this.state.user){
        this.setState({
          user : UserStore.getUser()
        })
      }
    }
  }
  postCallback = (error, committed, snapshot, dummy) =>{
    console.log(error, committed, snapshot, dummy)
    if(error){
      alert(error)
    }else{
      alert("post added")
    }
  }
  addPost = () => {
    const { postTitle, savableValue, postSlug, savableValue_excerpt, postCategory } = this.state
    let addPost = PostStore.addPost( postTitle, savableValue, postSlug, postCategory, savableValue_excerpt, this.postCallback )
  }
  handleTitleChange = (event) => {
    this.setState({
      postTitle: event.target.value,
    });
  };
  handleContentChange = (event) => {
    this.setState({
      postContent: event.target.value,
    });
  };
  handleSlugChange = (event) => {
    this.setState({
      postSlug: event.target.value,
    });
  };
  handleCategoryChange = (event) => {
    this.setState({
      postCategory: event.target.value,
    });
  };
  editorChange_excerpt = (editorState) => {
    this.setState({ excerpt: editorState, savableValue_excerpt: editorStateToHtml(editorState)})
  }
  editorChange = (editorState) => {
    this.setState({ value: editorState, savableValue: editorStateToHtml(editorState)})
  }
  render() {
    
    const { user, value, categoryValue, excerpt } = this.state
    const style={
      paperContent: {
        padding: "20px",
      },
      paperContentTitle: {
        margin:"5px 0"
      },
      dropdownmenu: {
        paddingLeft: "0px"
      },
      underlineStyle: {
        paddingLeft: "0px"
      }
    }
    return (
       user ?
      <div className={s.container}>

        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">
            <Paper style={style.paperContent}>
              <h4 style={style.paperContentTitle}>Post Information</h4>
              <TextField onChange={this.handleTitleChange} hintText="Post Title"/> <br />
              <TextField onChange={this.handleSlugChange} hintText="Post Slug"/> <br />
              <TextField onChange={this.handleCategoryChange} hintText="New Post Category"/> <br />
              <DropDownMenu underlineStyle={style.underlineStyle} style={style.dropdownmenu} value={categoryValue} onChange={this.handleCategoryChange}>
                <MenuItem value={0} primaryText="Existing Post Category" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
                <MenuItem value={5} primaryText="Weekly" />
              </DropDownMenu>
              <Editor
                plugins={plugins}
                editorState={this.state.excerpt}
                placeholder='Enter text...'
                onChange={this.editorChange_excerpt} 
                sidebarVisibleOn='always'/>
            </Paper> 
          </div>
          <div className="mdl-cell mdl-cell--8-col">
            <Paper style={style.paperContent}>
              <h4 style={style.paperContentTitle}>Post Content</h4>
              <Editor
                editorState={this.state.value}
                placeholder='Enter text...'
                onChange={this.editorChange} 
                sidebarVisibleOn='always'/>
                
              <RaisedButton onClick={this.addPost} label="Add Post" />
              <RaisedButton label="Action2" />
            </Paper> 
          </div>
        </div>
      </div>
      : 
      <p>Not authorized</p>
      
    )
  }
}

export default withStyles(s)(Admin);
