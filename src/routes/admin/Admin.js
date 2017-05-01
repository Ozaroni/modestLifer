/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
var firebase = require('firebase');

import UserStore from "../../data/stores/UserStore"
import PostStore from "../../data/stores/PostStore"
import history from '../../history';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Editor, editorStateFromHtml, editorStateToHtml, editorStateFromRaw, editorStateFromText, editorStateToJSON} from 'last-draft'

import video from 'ld-video'
import html from 'ld-html'

let plugins = [video, html]

let baseHtml = "Here"

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = editorStateFromText(baseHtml)
    this.state = { value: INITIAL_STATE, user: UserStore.getUser() }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  componentWillMount = () => {
    UserStore.on('userChanged', this._updateUser);
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
  addPost = () => {
    const { postTitle, savableValue } = this.state
    PostStore.addPost( postTitle, savableValue )
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

  editorChange = (editorState) => {
    this.setState({ value: editorState, savableValue: editorStateToHtml(editorState)})
    console.log(editorStateToHtml(editorState))
    console.log(editorStateToJSON(editorState))
  }

  render() {
    
    const { user, value } = this.state
    return (
       user ?
      <div className={s.root}>
        
            <TextField onChange={this.handleTitleChange} hintText="Post Title"/>  <br />
            <TextField onChange={this.handleSlugChange} hintText="Post Slug"/> 
         
            <Editor
              plugins={plugins}
              editorState={this.state.value}
              placeholder='Enter text...'
              onChange={this.editorChange} />
          
            <FlatButton onClick={this.addPost} label="Add Post" />
            <FlatButton label="Action2" />
          
      </div>
      : 
      <p>Not authorized</p>
      
    )
  }
}

export default withStyles(s)(Admin);
