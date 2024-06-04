import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    initializeAuth,
    getReactNativePersistence,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID,
} from "../env";

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Storage
const storage = getStorage(app);

// db
const db = getFirestore(app);
//
const uploadImageToFirebase = async (uri, imageName) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("downloadURL: ", downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};

export {
    auth,
    db,
    storage,
    signInWithEmailAndPassword,
    uploadImageToFirebase,
    createUserWithEmailAndPassword,
};
