import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableDepots from '../../pages/admin/Depots';

function DepostRoutes(props) {
    return (
        <Routes>
            <Route path='/admin/depots' element={<TableDepots />}>

            </Route>
        </Routes>
    );
}

export default DepostRoutes;