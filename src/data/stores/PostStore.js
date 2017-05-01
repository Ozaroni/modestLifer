
import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import firebase from "firebase"
import _ from "lodash"

import database from "../database"

class PostStore extends EventEmitter {
	constructor() {
		super();
		this.user = firebase.auth().currentUser ? firebase.auth().currentUser : null;
		this.posts = null
	}
	addPost(title, content){
		console.log(this.user)
		var user_id = this.user ? this.user.uid : firebase.auth().currentUser.uid
		var newPostKey = firebase.database().ref().child('posts').push().key;
		let postData = {
			title: title,
			content: content,
			user_id : user_id
		}
		var updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + user_id + '/' + newPostKey] = postData;

		return firebase.database().ref().update(updates);
	}
	getPostsOnce(){
		let that = this
		var postsRef = firebase.database().ref('posts').limitToLast(10);
		postsRef.once('value', function(snapshot) {
			that.posts = snapshot.val()
			that.emit("postsChanged");
			/*snapshot.forEach(function(childSnapshot) {
				var childKey = childSnapshot.key;
				var childData = childSnapshot.val();
				_.merge(that.posts, {childKey, childData})
			})*/
		})
	}
	returnPosts(){
		return this.posts
	}
	retrievePosts(){
		let that = this
		var postsRef = firebase.database().ref('posts').limitToLast(10);
		postsRef.on('child_added', function(snapshot) {
			/*that.posts = snapshot.val()
			that.emit("postsChanged");*/
		})
	}
	getOutlineForEdit(newOutline, newKey) {
		if(newOutline !== undefined){
			console.log('GETTING OUTLINE FOR EDIT', newOutline, this.outline)
			this.outline = newOutline;
			this.outlinekey = newKey;
			this.emit("launchEdit");
		}
	}
	handleActions(action) {
		console.log(action.type)
		switch(action.type) {
			case "EDITING_PAGE": {
				this.getPageForEdit(action.page, action.key);
			}
			
		}
	}
}

const postStore = new PostStore;

dispatcher.register(postStore.handleActions.bind(postStore));

export default postStore;