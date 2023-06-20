import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBnSMf5tfa7UWW0yiz_BI5wzIXvON8l9P8",
	authDomain: "netflix-clone-2p0.firebaseapp.com",
	projectId: "netflix-clone-2p0",
	storageBucket: "netflix-clone-2p0.appspot.com",
	messagingSenderId: "469413413465",
	appId: "1:469413413465:web:93990f55ce08023fd66748",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
