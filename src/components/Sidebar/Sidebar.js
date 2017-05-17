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

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import PostStore from "../../data/stores/PostStore"
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categories: null
    };
  }
  componentWillMount = () => {
    PostStore.getCategoriesOnce()
    PostStore.on("categoriesRetreived", this._setCategories)
  }
  _setCategories = () => {
    this.setState({
      categories: PostStore.returnCategories() 
    })
  }
  render() {
    const {categories} = this.state

    let categoryItems = _.map(categories, function(category, key){
      return <ListItem primaryText={category.title} key={key} />
    })
    return (
      <div className={s.root}>
        <Subheader>Categories</Subheader>
        <List>
          {categoryItems}
        </List>
      </div>
    );
  }
}

export default withStyles(s)(Sidebar);
