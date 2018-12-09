import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// // Reducers
import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';

/////// ADD YOUR FIREBASE CONFIG HERE /////////
const firebaseConfig = {
    apiKey: "AIzaSyD-PUKKz8QjW1O5FuvM9GzTYIxBK19mQqg",
    authDomain: "react-app-13ad5.firebaseapp.com",
    databaseURL: "https://react-app-13ad5.firebaseio.com",
    projectId: "react-app-13ad5",
    storageBucket: "react-app-13ad5.appspot.com",
    messagingSenderId: "55637759554"
};
// Init firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};


// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingReducer
});

// Local storage stuff
if (window.localStorage.getItem('settings') === null) {
  const defaultSetting = {
    balanceOnAdd: false,
    balanceOnEdit: false,
    allowRegistration: true
  }

  window.localStorage.setItem('settings', JSON.stringify(defaultSetting))
}

const initialState = {
setting: JSON.parse(window.localStorage.getItem('settings')),
}

const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )

export default store;

