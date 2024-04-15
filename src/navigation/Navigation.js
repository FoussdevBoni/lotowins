import React, { useEffect, useState } from 'react';
import HeaderCarousel from '../components/sections/visitor/HeaderCarousel';
import Visitor from './visitor/Visitor';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import User from './user/User';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import AdminConnexion from '../pages/admin/Login';
import CenteredContentPage from '../components/widgets/Container/MyContainer';
import { getUrlSegment } from '../functions/getUrlSegment';
import { Box } from '@mui/material';
import AdminAppBar from '../components/sections/admin/AdminAppBar';
import Admin from './admin/Admin';

    const segment1 = getUrlSegment(1) 

function Navigation(props) {
    const [user , setUser] = useState()
    const [connected, setConnected] = useState(false)
    const [isAdmin , setIsAmin ]= useState(false)
    const navigate= useNavigate()
    useEffect(()=>{
       onAuthStateChanged(auth, (user)=>{
            if (user) {
              if (user.email==='jeremieakohou@gmail.com') {
                  setIsAmin(true)
                 setConnected(true)
              }else {
                   setIsAmin(false)
                const userRef =  ref(db, 'users/'+user.uid)
                 setConnected(true)
                 onValue(userRef, (snapshot)=>{
                    const data = snapshot.val()
                    if (data) {
                      setUser(data)
                      navigate('/mon-dashboard?user='+data.username)
                      
                    }
                 })
              }
                

                
            }else{
               if (segment1!=='admin-login') {
                 navigate('/') 
               }else{
                   navigate('admin-login') 
               }
               setConnected(false)
            }
        })

    }, []  
    )
    return (
        <div>
          
          {
            !connected&&(
               <Box>
                  <Visitor />
               </Box>
            )
          }
           {
            connected&&(
                <Box>
                  {
                    !isAdmin ?  <User user={user}/>: <Box>
                      <AdminAppBar />
                       <Admin />
                    </Box>
                  }
                </Box>
              )
          }
        </div>
    );
}

export default Navigation;