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
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';

import PostStore from "../../data/stores/PostStore"

class Post extends React.Component {
  
  constructor(){
    super();
    this.state={
      //postData: PostStore.returnPosts()
    }
  }
  componentWillMount = () => {
    /*Get single post by slug*/
    /*PostStore.getPostsOnce()
    PostStore.on('postsChanged', this._updatePosts)
    PostStore.retrievePosts()
    PostStore.on('postsChanged', this._updatePosts);*/
  }
  _updatePosts = () => {
    /*this.setState({
      postData: PostStore.returnPosts()
    })*/
  }
  render() {
    const { slug } = this.props
    /*let posts = []
    const {postData} = this.state
    console.log(postData)

    posts = _.map(postData, function(post, index){
      console.log(post)
      return <Post key={"post_"+index} post={post} />
    })*/
    return (

      <div className={s.root}>
        <p> { slug } </p>
      </div>
    );
  }
}

export default withStyles(s)(Post);
