import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set , get } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import formaterDateISO8601 from './../../functions/formatDate';


export default function Rechargements({user}) {
  const [depots , setDepots] = React.useState([])
 

 

  



  React.useEffect(()=>{
    const dataRef = ref(db, 'depots')
    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setDepots(usersData)
        console.log(usersData)
      }
    })


  }, [])




  const navigate = useNavigate()

 
  depots.reverse()

  


  return (
    <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Tous les dépots
       </Typography>
       
            
          
            
           <br></br>  
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth+100 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
              <TableCell align="right">Nom client</TableCell>
             <TableCell align="right">Montant</TableCell>
            <TableCell align="right">Type de dépot</TableCell>
            <TableCell align="right">La date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depots.map((depot, index) =>{
                       
            if(depot.admin!==undefined){
          
                 return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {depots.length - index}
              </TableCell>
               <TableCell align="right">
                 {depot.deposant.username}
              </TableCell>
              <TableCell align="right">
                 {depot.amount}
              </TableCell>
                  <TableCell align="right">
                 {depot.type}
              </TableCell>
                <TableCell align="right">
                 { formaterDateISO8601(depot.date)}
              </TableCell>
            
            </TableRow>
          )
            }else{
                return null
            }
              
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}