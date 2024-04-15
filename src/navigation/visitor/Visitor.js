import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from '../../pages/visitor/Register';
import Home from '../../pages/visitor/Home';
import LoginPage from '../../pages/visitor/LoginPage';
import DashboardAdmin from '../../pages/admin/Dashbord';
import UsersRoutes from '../admin/UsersRoutes';
import UserTicketsRoutes from '../admin/UserTicketsRoutes';
import AdminConnexion from '../../pages/admin/Login';
import CenteredContentPage from '../../components/widgets/Container/MyContainer';

function Visitor(props) {
    return (
        <Box>
           <Routes>
             <Route path='/' Component={Home}/>
              <Route  path='/inscription' element={<CenteredContentPage content={<RegisterPage />}/>}/>
              <Route  path='/connexion'  element={<CenteredContentPage content={<LoginPage />}/>}/>
              <Route  path='/admin-login'  element={<CenteredContentPage content={<AdminConnexion />}/>}/>

            </Routes> 
            <UsersRoutes/>
            <UserTicketsRoutes />
        </Box>
    );
}

export default Visitor;