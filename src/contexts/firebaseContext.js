import { createContext, useContext, useEffect, useId, useState } from "react";
import { auth, db, provider,storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { collection, addDoc, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FirebaseContext = createContext(null);

export const useFirebaseContext = () => useContext(FirebaseContext);
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log("User: " + user);
  useEffect(() => {
    // console.log("User", user  );
    onAuthStateChanged(auth, (user) => {
      // console.log("User: " + JSON.stringify(user));
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const listAllBooks = () => {
    return getDocs(collection(db, 'books'));
  };

  const getBookById = (id) => {
    const docRef = doc(db,'books',id);
    const result = getDoc(docRef);
    return result;
    
  };

  const getImageURL = (path) =>{
    return getDownloadURL(ref(storage,path))
  }

  const placeOrder = async(bookId,qty)=>{
    const collectionRef = collection(db,'books',bookId,'orders');
    const result = await addDoc(collectionRef,{
      userID:user.uid,
      userEmail:user.email,
      userName:user.displayName,
      userPhotoURL:user.photoURL,
      qty:Number(qty)
    });
    return result;

  }

  const fetchMyOrders = async (userId) =>{
    if(!user) return null;
    const collectionRef = collection(db, 'books');
    const q = query(collectionRef,where("userID","==",userId));
    const result = await getDocs(q);
    return result;
    // console.log("fetchMyOrders",result.docs[0].data());
  }

  const getOrderById = async(bookId) =>{
    const collectionRef = collection(db,'books',bookId,'orders');
    const result = await getDocs(collectionRef);
    // console.log("getOrderById",result.docs[0].data());
    return result;
  }

  // console.log("User", JSON.stringify(user));

  const handleCreateNewListing = async (name,isbn,price,coverPic) => {
    const imageRef = ref(storage,`uploads/images/${Date.now()}-${coverPic.name}`);
    const uploadResult = await uploadBytes(imageRef,coverPic);
    return await addDoc(collection(db, "books"), {
      name,
      isbn,
      price,
      imageURL:uploadResult.ref.fullPath,
      userID:user.uid,
      userEmail:user.email,
      userName:user.displayName,
      userPhotoURL:user.photoURL
    });
  };

  const isLoggedIn = () => (user ? true : false);

  return (
    <FirebaseContext.Provider
      value={{
        handleCreateNewListing,
        isLoggedIn,
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        loginWithGoogle,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyOrders,
        getOrderById,
        user
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
