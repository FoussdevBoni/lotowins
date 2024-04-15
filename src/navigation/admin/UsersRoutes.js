import React , {useEffect , useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardPage from '../../pages/user/DashBoardPage';
import UserTicketsPage from '../../pages/user/UserTicketsPages';
import { onValue, ref } from 'firebase/database';
import UserDetails from '../../pages/admin/UserDetailsPage';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Box } from '@mui/material';
import Appbar from '../../components/widgets/AppBar/AppBar';
import AdminAppBar from '../../components/sections/admin/AdminAppBar';
import RechargePage from '../../pages/admin/RechargePage';

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
          users.map((user)=>{
            console.log(user)
            return (
                  <Route path={`admin/user-details/${user.id}`} element={<UserDetails  user={user}/>}/>
          
            )
          })
         }

          {
          users.map((user)=>{
            console.log(user)
            return (
                  <Route path={`admin/recharger/${user.id}`} element={<RechargePage  selectedUser={user}/>}/>
          
            )
          })
         }

         

        </Routes>
       </Box>
    );
}

export default UsersRoutes;