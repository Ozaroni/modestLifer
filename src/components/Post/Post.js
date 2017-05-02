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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReactHtmlParser from 'react-html-parser';

class Post extends React.Component {
  
  viewPost = () => {

  }

  render() {
    const { post } = this.props
    return (
      <div className={s.root}>
        
          <CardHeader
            title={ post.title }
            subtitle="Subtitle"
            avatar="images/jsa-128.jpg"
          />
          <CardText>
            { ReactHtmlParser(post.excerpt) }
          </CardText>
          <CardActions>
            <FlatButton href={"/post/"+post.slug} label="View Full Post" />
          </CardActions>
        
      </div>
    );
  }
}

export default withStyles(s)(Post);
