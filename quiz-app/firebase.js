// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8WOTo3nKlAjPEsUrDo5Rs1vXqpC7PdgE",
  authDomain: "fullstack-quiz-app.firebaseapp.com",
  projectId: "fullstack-quiz-app",
  storageBucket: "fullstack-quiz-app.appspot.com",
  messagingSenderId: "510828178049",
  appId: "1:510828178049:web:543fc66c0c4a40eabdbb80",
  measurementId: "G-3M8D2Z9CHB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
