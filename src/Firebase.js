import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: 'AIzaSyAWEBcev69dFq_NrWwlvpR7JZajtNArEx0',
    authDomain: "weather-analitica.firebaseapp.com",
    databaseURL: "https://weather-analitica-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weather-analitica",
    storageBucket: "weather-analitica.appspot.com",
    messagingSenderId: "513011361748",
    appId: "1:513011361748:web:84b275668fa5b7fd86d841",
    measurementId: "G-N73N708W7E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {analytics};