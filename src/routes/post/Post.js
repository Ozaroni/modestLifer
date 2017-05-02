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
import ReactHtmlParser from 'react-html-parser';
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
    PostStore.getSinglePost(this.props.slug)
    PostStore.on('singlePostRetreived', this._updatePost);
  }
  _updatePost = () => {
    this.setState({
      postData: PostStore.returnSinglePost()
    })
  }
  render() {
    const { slug } = this.props
    const { postData } = this.state
    /*let posts = []
    const {postData} = this.state
    console.log(postData)

    posts = _.map(postData, function(post, index){
      console.log(post)
      return <Post key={"post_"+index} post={post} />
    })*/
    return (

      <div className={s.container}>
        { postData ? 
          <div>
            <h1>{postData.title}</h1> 
            { ReactHtmlParser(postData.content) }
          </div>
        : null } 
      </div>
    );
  }
}

export default withStyles(s)(Post);
