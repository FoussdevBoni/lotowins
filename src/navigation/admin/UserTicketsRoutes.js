import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableTickets from '../../pages/admin/TousLesTickets';

function UserTicketsRoutes(props) {
    return (
        <Routes>
            <Route path='admin/tous-les-tickets' element={<TableTickets />}>

            </Route>
        </Routes>
    );
}

export default UserTicketsRoutes;