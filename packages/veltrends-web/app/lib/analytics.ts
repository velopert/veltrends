import { initializeApp } from 'firebase/app'
import { type Analytics, getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXI2n3VH-eAj_KHQTKrzirb28C0Mns5h8',
  authDomain: 'veltrends-d351a.firebaseapp.com',
  projectId: 'veltrends-d351a',
  storageBucket: 'veltrends-d351a.appspot.com',
  messagingSenderId: '147500437569',
  appId: '1:147500437569:web:313468bda8a513444d76c0',
  measurementId: 'G-4D41RGZXM5',
}

let analytics: Analytics | null = null

export function initializeAnalytics() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  analytics = getAnalytics(app)
}

export function getFirebaseAnalytics() {
  return analytics
}
