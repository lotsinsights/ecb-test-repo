// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyArWNgVs94aSDyfVS-hhIMNpBf_bBZa1ow",
//   authDomain: "ecb-pms.firebaseapp.com",
//   projectId: "ecb-pms",
//   storageBucket: "ecb-pms.appspot.com",
//   messagingSenderId: "169801932469",
//   appId: "1:169801932469:web:27879d9cbee1f3d307e8fc",
//   measurementId: "G-NZ5QW3FHH0",

//   // apiKey: "AIzaSyDpHskwyAfOCw7GomLA1j8C3t-_H9Edl1k",
//   // authDomain: "powercompms.firebaseapp.com",
//   // projectId: "powercompms",
//   // storageBucket: "powercompms.appspot.com",
//   // messagingSenderId: "601233604428",
//   // appId: "1:601233604428:web:08ca64683e4d4e644219e9",
//   // measurementId: "G-7GY5D1W6SM"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD-leoC1vNHq1vGSN8I2GInx7TEt3qE9x8",
  authDomain: "ecb-dev-test.firebaseapp.com",
  projectId: "ecb-dev-test",
  storageBucket: "ecb-dev-test.appspot.com",
  messagingSenderId: "40736981303",
  appId: "1:40736981303:web:ebbe73b1fd496c87415ab2",
  measurementId: "G-PYMF37NWLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appAuthWorker = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const authWorker = getAuth(appAuthWorker);
export const storage = getStorage(app);
