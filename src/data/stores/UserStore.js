
import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import firebase from "firebase"
import database from "../database"

class UserStore extends EventEmitter {
	constructor() {
		super();
		this.user = firebase.auth().currentUser ? firebase.auth().currentUser : null;
		console.log("USER STORE USER: ", this.user)
		let that = this
		firebase.auth().onAuthStateChanged(function(user) {
	      if (user) {
	        // User is signed in.
	        /*if(that.user == null){
	        	window.location.replace("/admin");
	        }*/
	        that.user = user
	        console.log(user)
	        // ...
	      } else {
	        // User is signed out.
	        that.user = null
	      }
	      console.log("NEW USER DATA")
	      that.emit("userChanged");
	    });
	}
	getUser(){
		//console.log(this.user, firebase.auth().currentUser)
		return this.user
	}
	logOut(){
		//console.log("Logging Out")
		let that = this
		firebase.auth().signOut().then(function() {
		  that.user = null
		  that.emit("userChanged");
		}, function(error) {
		  // An error happened.
		  console.log(error)
		});
	}
	watchUserChanges(){
		console.log("Watching user changes")

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

const userStore = new UserStore;

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;