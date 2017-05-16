
import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import firebase from "firebase"
import _ from "lodash"

import database from "../database"

class PostStore extends EventEmitter {
	constructor() {
		super();
		this.user = firebase.auth().currentUser ? firebase.auth().currentUser : null;
		this.posts = null;
		this.post = null;
	}
	returnSinglePost(){
		return this.post
	}
	getSinglePost(slug){
		let that = this
		var ref = firebase.database().ref('posts').orderByChild("slug").equalTo(slug).limitToLast(1);
		return ref.once("value").then(function (postSnap) {
			var result = null;
			postSnap.forEach(function (postSnap) {
			  that.post = postSnap.val();
			  that.emit("singlePostRetreived");
			  return true;
			});
		});
	}	
	addPostCategory(category, callback){
		console.log("doing category stuff: ", category)
		var catRef = firebase.database().ref('categories').child(category).limitToLast(1);
		catRef.once('value', function(snapshot) {
			console.log("DATA", snapshot.val())
			if(snapshot.val() == null){
				console.log("Adding Category")
				var newPostKey = firebase.database().ref().child('categories').push().key;
				let catData = {
					title: category,
				}
				var updates = {};
				updates['/categories/' + newPostKey] = catData;
				firebase.database().ref().update(updates, function(error, committed, snapshot, dummy){
					callback(newPostKey, "key") 
				});
			}else{
				snapshot.forEach(function(snapshot) {
					console.log(snapshot)
					if(snapshot.val() !== null){
						console.log("Category Exists: ", snapshot.val(), snapshot.key)
						callback(snapshot.val(), "title")
					}
				})
			}
		})
	}	
	addPost(title, content, slug, category, excerpt, callback){
		let that = this
		if(title && content && slug && category && excerpt && callback){
			this.addPostCategory(category, function(categoryReturn, cond){
				var user_id = that.user ? that.user.uid : firebase.auth().currentUser.uid
				var newPostKey = firebase.database().ref().child('posts').push().key;
				console.log(cond, category, categoryReturn)
				let catKey = cond == "key" ? category : categoryReturn 
				let catTitle = cond == "title" ? categoryReturn : category
				let postData = {
					title: title,
					content: content,
					slug: slug,
					categoryKey: catKey,
					categoryTitle: catTitle,
					excerpt: excerpt,
					user_id : user_id,
					date: new Date(),
				}
				var updates = {};
				updates['/posts/' + newPostKey] = postData;
				updates['/user-posts/' + user_id + '/' + newPostKey] = postData;

				firebase.database().ref().update(updates, function(error, committed, snapshot, dummy){console.log(error, committed, snapshot, dummy); callback(error, committed, snapshot, dummy) } );
			
			})
		}else{
			console.log(title, content, slug,  category, excerpt, callback)
			callback("Some Information was missing...")
		}
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
	getCategoriesOnce(){
		let that = this
		var postsRef = firebase.database().ref('categories');
		postsRef.once('value', function(snapshot) {
			that.categories = snapshot.val()
			that.emit("categoriesRetreived");
			/*snapshot.forEach(function(childSnapshot) {
				var childKey = childSnapshot.key;
				var childData = childSnapshot.val();
				_.merge(that.posts, {childKey, childData})
			})*/
		})
	}
	returnCategories(){
		return this.categories
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