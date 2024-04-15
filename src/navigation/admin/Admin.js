import { Box } from '@mui/material';
import React from 'react';
import AdminAppBar from '../../components/sections/admin/AdminAppBar';
import UsersRoutes from './UsersRoutes';
import UserTicketsRoutes from './UserTicketsRoutes';
import { Route, Routes } from 'react-router-dom';
import DashboardAdmin from '../../pages/admin/Dashbord';
import DepostRoutes from './DepotsRoutes';
import RetaritsRoutes from './RetraitsRoutes';
import Statistics from '../../pages/admin/Statistics';
import TableReclamation from '../../pages/admin/Reclamations';
import AdminConnexion from '../../pages/admin/Login';
import PublishInfo from '../../pages/admin/PublishInfo';

function Admin(props) {
  
    return (
        <Box>
           <AdminAppBar />
            <Box marginTop={12}>
              <Routes>
                <Route path='/admin' element={<DashboardAdmin />}>
                </Route>
                <Route path='/admin/evolution-plateforme' Component={Statistics}
                ></Route>
                 <Route path='/admin/reclamations' Component={TableReclamation}
                ></Route>
                  <Route path='/admin/publier-une-information' Component={PublishInfo}
                ></Route>
              </Routes>
             <UsersRoutes />
             <UserTicketsRoutes />
             <DepostRoutes />
             <RetaritsRoutes />
            </Box>
        </Box>
    );
}

export default Admin;