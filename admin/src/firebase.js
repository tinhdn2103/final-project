import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyD7iuL10nFJi-pkDXPv4e0vAUvnoVz1Auk",
//   authDomain: "movie-web-fadf1.firebaseapp.com",
//   projectId: "movie-web-fadf1",
//   storageBucket: "movie-web-fadf1.appspot.com",
//   messagingSenderId: "131558307872",
//   appId: "1:131558307872:web:23b94d98db73a974a0e445",
//   measurementId: "G-9ZK1ELNSLY",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBXNMOkdPBz__rMIcqcDnt70HU696bJz_0",
  authDomain: "movie-web-2.firebaseapp.com",
  projectId: "movie-web-2",
  storageBucket: "movie-web-2.appspot.com",
  messagingSenderId: "422596220990",
  appId: "1:422596220990:web:928d468d1720a3f091d96f",
  measurementId: "G-D0D2BMR0RB",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDpSZrqGRyW-3WhVeBp8eVnbzCzQ5ylPhA",
//   authDomain: "movie-web-3.firebaseapp.com",
//   projectId: "movie-web-3",
//   storageBucket: "movie-web-3.appspot.com",
//   messagingSenderId: "675983882567",
//   appId: "1:675983882567:web:d8e88a69acfd85d5ce7462",
//   measurementId: "G-VZP75TT2LW"
// };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
