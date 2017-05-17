/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import _ from 'lodash';
import {IntlProvider, FormattedDate} from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';
import ReactHtmlParser from 'react-html-parser';
import PostStore from "../../data/stores/PostStore"
import Sidebar from "../../components/Sidebar/Sidebar"

import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {convertFromHTML, convertToHTML} from 'draft-convert';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class Post extends React.Component {
  
  constructor(){
    super();
    this.state={
      //postData: PostStore.returnPosts()
    }
  }
  componentWillMount = () => {
    /*Get single post by slug*/
    PostStore.getSinglePost(this.props.slug)
    PostStore.on('singlePostRetreived', this._updatePost);
  }
  _updatePost = () => {
    let post = PostStore.returnSinglePost()
    this.setState({
      postData: post,
      postContent: EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
    })
  }
  _convertPost = (data) => {
    let postContent = convertToHTML({
      styleToHTML: (style) => {
        if (style === 'BOLD') {
          return <b></b>;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        if (entity.type === 'image') {
          console.log("RETURNING IMG", entity, originalText)
          console.log("ENTITY: ", entity.data.src)
          return <span><img className={s.imgResponsive} src={entity.data.src} />{originalText}</span>
        }
        if (entity.type === 'video') {
          console.log("RETURNING Video", entity, originalText)
          console.log("ENTITY: ", entity.data.src)
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = entity.data.src.match(regExp);
          if (match && match[2].length == 11) {
              return <iframe width="560" height="315" src={entity.data.src} frameborder="0" allowfullscreen></iframe>
          }
          else {
              return <video controls><source src={entity.data.src} />{originalText}</video>
          }
          
        }
        return originalText;
      },
      blockToHTML: (block) => {
        const type = block.type
        console.log(type, block)
        if (type === 'atomic' || type === 'image' || type === 'video') {
          let url = block.data.src
          console.log("Block: ", url)
          return { start: " ", end: " " }
        }
        if (type === 'unstyled') {
          return <p />
        }
      }
    })(data.getCurrentContent())
    return postContent
  }
  render() {
    const { slug } = this.props
    const { postData, postContent } = this.state
    let convoContent = "No Content"
    if(postData){
      convoContent = this._convertPost(postContent)
      console.log(postData)
    }
    return (

      <div className={s.container}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--9-col">
            { postData ? 
              <div>
                <h1>{postData.title}</h1> 
                { ReactHtmlParser(convoContent) }
              </div>
            : null }
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Post);
