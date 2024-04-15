import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardPage from '../../pages/user/DashBoardPage';
import UserTicketsPage from '../../pages/user/UserTicketsPages';
import { Box } from '@mui/material';
import UserAppBar from '../../components/sections/user/UserAppBar';
import MesRetraits from '../../pages/user/MesRetraits';
import TableDepots from '../../pages/user/mesDepots';
import TableTickets from '../../pages/user/MesTickets';
import TicketsRoutes from './TicketsRoutes'
import Validations from '../../pages/user/Validations';
import Reclamation from '../../pages/user/Reclamations';
import Recharger from '../../pages/user/Recharger';
import UsersRoutes from './UsersRoutes';
import ProfilePage from '../../pages/user/ProfilePage';
import UpdateProfilePage from '../../pages/user/UpdateOProfilePage';
import RechargerMonCompte from '../../pages/user/RechargerMonCompte';
function User({user}) {
    return (
         <Box>
              <UserAppBar user={user}/>
          <Routes>
            <Route path='mon-dashboard' element={<DashBoardPage user={user}/>}/>
            <Route path='mes-tickets' element={<TableTickets user={user}/>}/>
            <Route path='mes-retraits' element={<MesRetraits user={user}/>}/>
            <Route path='mes-depots' element={<TableDepots user={user}/>}/>
             <Route path='validations' element={<Validations user={user}/>}/>
             <Route path='reclamations' element={<Reclamation user={user}/>}/>
            <Route path='recharger-un-compte' element={<Recharger user={user}/>}/>
            <Route path='recharger-mon-compte' element={<RechargerMonCompte user={user}/>}/>
          <Route path='mon-compte' element={<ProfilePage user={user}/>}/>
                    <Route path='modifier-profile' element={<UpdateProfilePage user={user}/>}/>

          </Routes>
         <UsersRoutes  user={user}/>
         <TicketsRoutes />
         
         </Box>
    );
}

export default User;