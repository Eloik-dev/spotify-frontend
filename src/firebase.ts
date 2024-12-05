import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAioLu-5hijoeEObgFKZxA4uVJ6V31GWkg",
    authDomain: "speutifye.firebaseapp.com",
    projectId: "speutifye",
    storageBucket: "speutifye.firebasestorage.app",
    messagingSenderId: "305060796733",
    appId: "1:305060796733:web:0bd4203587aa5d84dd8d54",
    measurementId: "G-CTQ90Z038F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logInWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        
        // Check if the error status is 400
        if (err.code === 'auth/invalid-credential') {
            alert('Invalid email or password. Please try again.');
        } else if (err.code === 'auth/user-disabled') {
            alert('This user account has been disabled. Please contact support.');
        } else if (err.code === 'auth/user-not-found') {
            alert('No user found with this email.');
        } else if (err.status === 400) {
            alert('Bad request. Please check your input and try again.');
        } else {
            alert('An unexpected error occurred. Please try again later.');
        }
    }
};