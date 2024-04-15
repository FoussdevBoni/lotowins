import React , {useEffect , useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardPage from '../../pages/user/DashBoardPage';
import UserTicketsPage from '../../pages/user/UserTicketsPages';
import { onValue, ref } from 'firebase/database';
import UserDetails from '../../pages/admin/UserDetailsPage';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Box } from '@mui/material';
import RechargePage from '../../pages/user/RechargerForm';
import RechargeOtherCompte from '../../pages/user/RechargeAutreCompte';

function UsersRoutes({user}) {
     const [users , setUsers] = React.useState([])

  useEffect(()=>{
    const dataRef = ref(db, 'users')

    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setUsers(usersData)
        console.log(usersData)
      }
    })
  }, [])
    return (
       <Box>
        <Routes>
          {
          users.map((userSelected)=>{
            console.log(userSelected)
            return (
                  <Route path={`recharger/${userSelected.id}`} element={<RechargeOtherCompte selectedUser={userSelected} user={user}/>}/>
          
            )
          })
         }
        </Routes>
       </Box>
    );
}

export default UsersRoutes;