
var firebase = require("firebase");

import dispatcher from '../dispatcher';
import $ from "jquery";

export function editOutline(outline, key){
		console.log("OUTLINE ACTIONS: Dispatching event")
		dispatcher.dispatch({
			type: 'EDITING_OUTLINE',
			outline: outline,
			key: key
		});
}
