import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import formaterDateISO8601 from '../../functions/formatDate';
import { createReference } from '../../functions/createTicketRef';

function Validations({user}) {
    const [validations , setValidations] = useState([])
    useEffect(()=>{
        const validRef = ref(db , 'validations')
        onValue(validRef , (snapshot)=>{
            const data = snapshot.val()
            if (data) {
                const validationData = Object.entries(data).map(([key, value])=>({
                    ...value, 
                    id: key
                }))
                setValidations(validationData)
            }else{
                setValidations([])
            }
        })
        
    },[])

    validations.reverse()
    return (
           <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Validations
       </Typography>
       
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
              <TableCell align="right">Montant </TableCell>
               <TableCell align="right">Date</TableCell>
             <TableCell align="right">Référence du ticket</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {validations.map((item, index) =>{
            
            if (item.user.id === user.id) {
                
             return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {validations.length - index}
              </TableCell>
               <TableCell align="right">
                 {item.amount}
              </TableCell>
               <TableCell align="right">
                 {formaterDateISO8601(item.date)}
              </TableCell>
            
              <TableCell align="right">
                 {createReference(item.ticket.dateHeureEnregistrement, 'TIC')}
              </TableCell>
            </TableRow>
          )
    }  else {
        return null
    }
           


    })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    );
}

export default Validations;