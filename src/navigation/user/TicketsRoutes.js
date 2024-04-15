import React , {useEffect , useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardPage from '../../pages/user/DashBoardPage';
import UserTicketsPage from '../../pages/user/UserTicketsPages';
import { onValue, ref } from 'firebase/database';
import UserDetails from '../../pages/admin/UserDetailsPage';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Box } from '@mui/material';
import Appbar from '../../components/widgets/AppBar/AppBar';
import UserTickets from '../../pages/user/UserTicketsPages';

function TicketsRoutes({user}) {
     const [tickets , setTickets] = React.useState([])

  useEffect(()=>{
    const dataRef = ref(db, 'tickets/allTickets')

    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const ticketsData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setTickets(ticketsData)
        console.log(ticketsData)
      }
    })
  }, [])
    return (
       <Box>
          <Routes>
         {
          tickets.map((ticket)=>{
            console.log(user)
            return (
                  <Route path={`mes-tickets/${ticket.id}`} element={<UserTickets  ticket={ticket}/>}/>
          
            )
          })
         }
        </Routes>
       </Box>
    );
}

export default TicketsRoutes;