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
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class PostSplit extends React.Component {
  
  render() {
  	const { url } = this.props
 	const {
	  FacebookShareButton,
	  LinkedinShareButton,
	  TwitterShareButton,
	  PinterestShareButton,
	} = ShareButtons;

	const {
		FacebookShareCount,
		LinkedinShareCount,
		PinterestShareCount,
		} = ShareCounts;

	const FacebookIcon = generateShareIcon('facebook');
	const TwitterIcon = generateShareIcon('twitter');
	const LinkedinIcon = generateShareIcon('linkedin');
	const PinterestIcon = generateShareIcon('pinterest');

    return (
      <div className={s.postSplitterContainer}>
        <div className={s.postSplitter}>
         	   	<IconMenu
			      iconButtonElement={<IconButton><FontIcon className="material-icons" >share</FontIcon></IconButton>}
			      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			      targetOrigin={{horizontal: 'left', vertical: 'top'}}
			    >
			      <MenuItem primaryText={
			      	<FacebookShareButton
		            url={"http://www.google.com"}
		            title={"Some Title"}
		            className="Demo__some-network__share-button">
		            <FacebookIcon
		              size={32}
		              round />
		          </FacebookShareButton>
			      } />
			      <MenuItem primaryText={<div>
			      	<LinkedinShareButton
		            url={"http://www.google.com"}
		            title={"Some Title"}
		            windowWidth={750}
		            windowHeight={600}
		            className="Demo__some-network__share-button">
		            <LinkedinIcon
		              size={32}
		              round />
		          </LinkedinShareButton>

		          <LinkedinShareCount
		            url={"www.cnet.com"}
		            className="Demo__some-network__share-count">
		            {count => count}
		          </LinkedinShareCount></div>
			      } />
			      <MenuItem primaryText={
			      	<TwitterShareButton
		            url={"www.modestLifer.com"}
		            title={"Some Title"}
		            className="Demo__some-network__share-button">
		            <TwitterIcon
		              size={32}
		              round />
		          </TwitterShareButton>
			      } />
			      <MenuItem primaryText={
			      	<PinterestShareButton
		            url={"http://www.google.com"}
		            windowWidth={1000}
		            windowHeight={730}
		            className="Demo__some-network__share-button">
		            <PinterestIcon size={32} round />
		          </PinterestShareButton>
			      } />
		    </IconMenu>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PostSplit);
