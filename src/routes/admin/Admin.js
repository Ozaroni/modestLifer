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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import BlogContentEditor from "./BlogContentEditor"
import {Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw } from 'draft-js';
import {convertFromHTML, convertToHTML} from 'draft-convert';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      excerpt: null,
      user: UserStore.getUser(),
      categoryValue: "0"
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  componentWillMount = () => {
    UserStore.on('userChanged', this._updateUser);
    PostStore.getCategoriesOnce()
    PostStore.on('categoriesRetreived', this._setCategories)
  }
  _setCategories = () => {
    this.setState({
      availableCategories: PostStore.returnCategories(),
    });
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
    const { postTitle, savableValue, postSlug, savableValue_excerpt, postCategory, categoryValue } = this.state
    let excerptHtml = JSON.stringify(convertToRaw(savableValue_excerpt.getCurrentContent()))
    let postHtml = JSON.stringify(convertToRaw(savableValue.getCurrentContent()))
    const passCategory = categoryValue != "0" ? categoryValue : postCategory
    let addPost = PostStore.addPost( postTitle, postHtml, postSlug, passCategory, excerptHtml, this.postCallback )
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
  handleCategoryChange = (event, cond) => {
    console.log(cond)
    cond == "dropdown" ?
    this.setState({
      categoryValue: value,
    })
    :
    this.setState({
      postCategory: event.target.value,
    })
  };
  handleCategorySelect = (event, index, value) => {
    this.setState({
      categoryValue: value,
    })
    
  };
  editorChange_excerpt = (editorState) => {
    console.log("HERE")
    this.setState({ savableValue_excerpt: editorState })
    //this.setState({ editorStateExcerpt: value })
    
  }
  editorChange = (editorState) => {
    console.log("HERE")
    this.setState({ savableValue: editorState })
    //this.setState({ editorState: editorState })
  }
  render() {
    
    const { user, value, categoryValue, excerpt, availableCategories } = this.state
    const style={
      paperContent: {
        padding: "20px",
      },
      paperContentTitle: {
        margin:"5px 0"
      },
      dropdownmenu: {
        paddingLeft: "0px",
        display: "inline-block",
      },
      underlineStyle: {
        paddingLeft: "0px"
      },
      editorHolder:{
        padding: "0px",
        border: "0px solid #ddd",
        minHeight: "300px",
        marginBottom: "20px",
      },
      textField: {
        width: "100%"
      },
    }
    let categoryItems = _.map(availableCategories, function(category, key){
      return <MenuItem value={key} primaryText={category.title} />
    })
    categoryItems = categoryItems.concat(<MenuItem value="0" primaryText="Select a category..." />)
    return (
       user ?
      <div className={s.container}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <Paper style={style.paperContent}>
              <h4 style={style.paperContentTitle}>Post Information</h4>
              <TextField style={style.textField} onChange={this.handleTitleChange} hintText="Post Title"/> <br />
              <TextField style={style.textField} onChange={this.handleSlugChange} hintText="Post Slug"/> <br />
              <TextField onChange={this.handleCategoryChange} hintText="New Post Category"/> <br />
              <DropDownMenu underlineStyle={style.underlineStyle} style={style.dropdownmenu} value={categoryValue} onChange={this.handleCategorySelect}>
                {categoryItems}
              </DropDownMenu>
            </Paper>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <Paper style={style.paperContent}>
              <h4 style={style.paperContentTitle}>Post Excerpt</h4>
              <div style={style.editorHolder}>
                <BlogContentEditor passState={this.editorChange_excerpt.bind(this)}/>
              </div>
            </Paper> 
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <Paper style={style.paperContent}>
              <h4 style={style.paperContentTitle}>Post Content</h4>
              <div style={style.editorHolder}>
                <BlogContentEditor passState={this.editorChange.bind(this)}/>
              </div>
              <RaisedButton onClick={this.addPost} label="Add Post" />
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
