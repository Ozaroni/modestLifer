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
import s from './Home.css';

import Post from "../../components/Post/Post"
import PostStore from "../../data/stores/PostStore"
import RefreshIndicator from 'material-ui/RefreshIndicator';
class Home extends React.Component {
  
  constructor(){
    super();
    this.state={
      postData: PostStore.returnPosts()
    }
  }
  componentWillMount = () => {
    PostStore.getPostsOnce()
    PostStore.on('postsChanged', this._updatePosts)
    /*PostStore.retrievePosts()
    PostStore.on('postsChanged', this._updatePosts);*/
  }
  _updatePosts = () => {
    this.setState({
      postData: PostStore.returnPosts()
    })
  }
  render() {
    let posts = []
    const {postData} = this.state
    console.log(postData)

    posts = _.map(postData, function(post, index){
      console.log(post)
      return <Post key={"post_"+index} post={post} />
    })
    const styles = {
      relativeDiv: {
        position: "relative",
        width: "100%",
      }
    }
    return (
      
      <div className={s.root}>
        <div className={s.container}>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={s.rightBorder}>
                <div className={s.contentPadding}> 
               { posts.length > 0 ?
                   posts 
                  :
                <div style={styles.relativeDiv}><RefreshIndicator size={40} left={10} top={0} status="loading" /></div>
              }
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={s.contentPadding}>
                <div className="mdl-grid mdl-grid--no-spacing">
                  <div className="mdl-cell mdl-cell--4-col">
                    <img className={s.imgResponsiveImgFeed} src="https://placeimg.com/300/300/any" />
                  </div>
                  <div className="mdl-cell mdl-cell--4-col">
                    <img className={s.imgResponsiveImgFeed} src="https://placeimg.com/300/300/any" />
                  </div>
                  <div className="mdl-cell mdl-cell--4-col">
                    <img className={s.imgResponsiveImgFeed} src="https://placeimg.com/300/300/any" />
                  </div>
                </div>
                <br />
                <img src="https://pbs.twimg.com/profile_images/559429368712146946/wiOhw0zd.jpeg" />
                <h4>Shannon Dittmar </h4>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default withStyles(s)(Home);
