// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA6ttEZM7wxGtwzJIRkqpKPyzPahyc9itU",
	authDomain: "to-do-app-12a45.firebaseapp.com",
	projectId: "to-do-app-12a45",
	storageBucket: "to-do-app-12a45.appspot.com",
	messagingSenderId: "472792081827",
	appId: "1:472792081827:web:c8884af383e6e363142616",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app
