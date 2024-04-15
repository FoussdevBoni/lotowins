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
import  formaterDateISO8601  from '../../functions/formatDate';
import { ticketsByFormule, ticketsByTirage , ticketsByDate, ticketsByStatus } from '../../functions/filters';
import { afficherResultatsGagnants } from '../../functions/verifiyTicketGagnant';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const tirages = [
    'B11H',
    'B14H',
    'B18H',
     'C7H', 
     'C10H',
     'C13H',
     'C16H', 
     'C21H',
     'C23H', 
     'T14H',
     'T19H', 


  ]
const formules = [
  'NA1POTO',
  'NAP1SIMPLE',
  'NAP2SIMPLE',
  'NAP2TU2',
  'NAP2TU3',
  'NAP2TU4', 
  'NAP3',
  'NAP4',
  'NAP5',
  'BASESIMPLE',
  'BASETU2',
  'BASETU3',
  'BASETU4',



]

export default function TableRetraits() {
  const [retraits , setRetraits] = React.useState([])
 
  React.useEffect(()=>{
    const dataRef = ref(db, 'retraits')
    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setRetraits(usersData)
        console.log(usersData)
      }
    })
   

  }, [])
   retraits.reverse()




  const navigate = useNavigate()

 
  

  


  return (
    <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Tous les Retraits
       </Typography>
       
            
          
            
           <br></br>  
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth+100 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
              <TableCell align="right">Identifiant  du client</TableCell>
             <TableCell align="right">Montant</TableCell>
            <TableCell align="right">Moyen de payement</TableCell>
          <TableCell align="right">Infos du compte de payement</TableCell>
            <TableCell align="right">Statut</TableCell>
            <TableCell align="right">La date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {retraits.map((retrait, index) =>{
                       
             return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {retraits.length - index}
              </TableCell>
               <TableCell align="right">
                 {retrait.user.username}
              </TableCell>
              <TableCell align="right">
                 {retrait.amount}
              </TableCell>
                  <TableCell align="right">
                 {retrait.payWay}
              </TableCell>
               <TableCell align="right">
                 {retrait.accountInfos}
               </TableCell>
                <TableCell align="right">
                  {retrait.status}
              </TableCell>
              <TableCell align="right">
                  {retrait.date}
              </TableCell>
                 <TableCell align="right">
                  <Button color='primary' variant='contained' onClick={()=>{
                    const dataRef = ref(db , 'retraits/'+retrait.id+'/status')
                    set(dataRef , 'Validé')
                  }}>
                    Valider
                  </Button>
              </TableCell>
               <TableCell align="right">
                  <Button color='primary' variant='contained' onClick={()=>{
                    const dataRef = ref(db , 'retraits/'+retrait.id+'/status')
                    set(dataRef , 'Annulé')
                  }}>
                    Annuler
                  </Button>
              </TableCell>
            </TableRow>
          )
              
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}