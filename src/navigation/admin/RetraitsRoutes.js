import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableDepots from '../../pages/admin/Depots';
import TableRetraits from '../../pages/admin/RetraitsPage';

function RetaritsRoutes(props) {
    return (
        <Routes>
            <Route path='/admin/retraits' element={<TableRetraits />}>
            </Route>
        </Routes>
    );
}

export default RetaritsRoutes;