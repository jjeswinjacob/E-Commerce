import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBHMOJu7SFHkxaMfTq0pHdYMdd79HOgxQU",
    authDomain: "nosql-53dcc.firebaseapp.com",
    databaseURL: "https://nosql-53dcc.firebaseio.com",
    projectId: "nosql-53dcc",
    storageBucket: "nosql-53dcc.appspot.com",
    messagingSenderId: "306600807291",
    appId: "1:306600807291:web:29dd2756f103c3794ccbde",
    measurementId: "G-W5XS8E59M9"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additioalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additioalData
            });
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;