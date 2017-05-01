import firebase from 'firebase';

var fireBaseConfig = {
  apiKey: "AIzaSyBR6mRKf3mmDjqmVkDUd-PGYuE-pKkfbjk",
  authDomain: "localhost",
  databaseURL: "https://modernlifer-fdad2.firebaseio.com",
  projectId: "modernlifer-fdad2",
  storageBucket: "modernlifer-fdad2.appspot.com",
  messagingSenderId: "1053663148908"
};

firebase.initializeApp(fireBaseConfig);

const database = firebase.database();

export default database;