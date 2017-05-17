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
class PostSplit extends React.Component {
  
  render() {
  
    return (
      <div className={s.postSplitterContainer}>
        <div className={s.postSplitter}>
          <FontIcon className="material-icons" >share</FontIcon>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PostSplit);
