import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAvzPxclhrzyfYQJIE7C5Z36xRE7NaqUKc",
  authDomain: "fir-9-a4f9f.firebaseapp.com",
  projectId: "fir-9-a4f9f",
  storageBucket: "fir-9-a4f9f.appspot.com",
  messagingSenderId: "1008036524515",
  appId: "1:1008036524515:web:c70c317a2ca8e07e8d30d6"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(bd, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data
  const unsubCol = onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })

  // adding documents
  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createdAt: serverTimestamp()
    })
    .then(() => {
      addBookForm.reset()
    })

  })

  // deleting arguments
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
      .then(() => {
        deleteBookForm.reset()
      })
  })

  // get a single document
  const docRef = doc(db, 'books', 'LHhPBudwn4k6THw8Uypb')

  const unsub = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  })

  // updating a document
  const updateForm = document.querySelector('.update')
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateBookForm.id.value)

    updateDoc(docRef, {
      title: 'updated title'
    })
    .then(() => {
      updateForm.reset()
    })
      
  })

  //signing users up
  const signupForm = document.querySelector('.signup')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //console.log('user created:', cred.user)
      signupForm.reset()
    })
    console.log(err.message)
  })

  // logging in and out
  const logoutButton = document.querySelector('.logout')
  logoutButton.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        //onsole.log('the user signed out')
      })
      .catch((err) => {
        console.log(err.message)
    })

  })

  const loginButton = document.querySelector('.login')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //console.log('user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
  })

  // subscribing to auth changes
  const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })

  // unsubscribing from changes (auth & db)
  const unsubButton = document.querySelector('.unsub')
  unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubCol()
    unsubDoc()
    unsubAuth()
  })

  