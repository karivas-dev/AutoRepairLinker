import React, { useState, useEffect } from 'react';
import { getAuthIsAdmin, getAuthType } from './AuthContext';

/* const [type, setType] = useState(null); */
/* const [user,setUser] = useState({isAdmin:false, type:''}); */

/* export const user = {
    isAdmin: await getAuthIsAdmin(), 
    type:  await getAuthType()
}; */
export const user = {};

Promise.all([getAuthIsAdmin(), getAuthType()])
  .then(([isAdmin, type]) => {
      user.isAdmin = isAdmin;
      user.type = type;
  })
  .catch((error) => {
      // Handle errors if needed
      console.error(`Error fetching data: ${error}`);
  });
/* useEffect(() => {
    const checkStatus = async () => {
        user.type = await getAuthType();
        user.isAdmin = await getAuthIsAdmin();
    }
    checkStatus();
}, []); */