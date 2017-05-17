/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';
import PostSplit from './PostSplit';

import {IntlProvider, FormattedDate} from 'react-intl';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReactHtmlParser from 'react-html-parser';
import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {convertFromHTML, convertToHTML} from 'draft-convert';
class Post extends React.Component {
  constructor(props){
    super(props)
    //const DBEditorState = convertFromRaw(JSON.parse(props.post.excerpt));
    console.log("PRPOS: ", props.post.excerpt)
    this.state = {
      content: EditorState.createWithContent(convertFromRaw(JSON.parse(props.post.excerpt)))
    };
  }
  render() {
    const { post } = this.props
  
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
    })(this.state.content.getCurrentContent())

    console.log(postContent)
    return (
      <div className={s.root}>
          
          <CardTitle title={ <a href={"/post/"+post.slug} >{post.title}</a> } subtitle={<div><IntlProvider locale="en"><FormattedDate value={post.date} /></IntlProvider> - <i>{post.categoryTitle}</i></div>} />
          <CardText>
            Category: { post.categoryTitle }
          </CardText>
          <CardText>
            { ReactHtmlParser(postContent) }
          </CardText>
          <PostSplit url={"/post/"+post.slug} />
      </div>
    );
  }
}

export default withStyles(s)(Post);
