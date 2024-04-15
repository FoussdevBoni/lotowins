import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref, set } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyBbkHqn1p7Fc16FKx0eQrO6VZAjXEQ8udg",
  authDomain: "lotowins-f18d8.firebaseapp.com",
  databaseURL: "https://lotowins-f18d8-default-rtdb.firebaseio.com",
  projectId: "lotowins-f18d8",
  storageBucket: "lotowins-f18d8.appspot.com",
  messagingSenderId: "786571406423",
  appId: "1:786571406423:web:6fe7218c270763242dc712",
  measurementId: "G-86N56WSQ1T"
};

const app = initializeApp(firebaseConfig);


// Constante pour realtime Database 
export const db = getDatabase(app);
//Constante pour authentification
export  const auth = getAuth(app);
export const  storage  = getStorage(app);









