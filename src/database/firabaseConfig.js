// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD2E1bzncXB2FZGJu_aJGaQQGhx3De74iE",
  authDomain: "cms-ticket-sale-10873.firebaseapp.com",
  projectId: "cms-ticket-sale-10873",
  storageBucket: "cms-ticket-sale-10873.appspot.com",
  messagingSenderId: "527140455126",
  appId: "1:527140455126:web:780a41c3b80bb632ec3f77",
  measurementId: "G-G9W0CK3FZ7",
  databaseURL: "https://cms-ticket-sale-10873-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { analytics };
export default app;
