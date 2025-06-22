// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: 'mern-estate.firebaseapp.com',
//   projectId: 'mern-estate',
//   storageBucket: 'mern-estate.appspot.com',
//   messagingSenderId: '1078482850952',
//   appId: '1:1078482850952:web:28f19139ab77246602fb3d',
// };



// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);





// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxDvv5MvOGZ0ZnEkZLw5XeJ9Wm2m6AQxw",
  authDomain: "estate-70265.firebaseapp.com",
  projectId: "estate-70265",
  storageBucket: "estate-70265.firebasestorage.app",
  messagingSenderId: "1090031952993",
  appId: "1:1090031952993:web:e25e218e8939b9c658f620",
  measurementId: "G-RXB2L6MPLQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);