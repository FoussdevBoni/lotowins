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

export default function TableReclamation() {
  const [reclamations , setReclamations] = React.useState([])
  const [response , setResponse] = React.useState('')
  React.useEffect(()=>{
    const dataRef = ref(db, 'reclamations')
    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setReclamations(usersData)
        console.log(usersData)
      }
    })

  }, [])
  reclamations.reverse()



reclamations.reverse()

  const navigate = useNavigate()

 
  

  


  return (
    <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Les reclamations
       </Typography>
       
            
          
            
           <br></br>  
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth+100 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
              <TableCell align="right">Client</TableCell>
             <TableCell align="right">Details</TableCell>
             <TableCell align="right">Référence du ticket</TableCell>
            <TableCell align="right">Statut</TableCell>
            <TableCell align="right">La date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamations.map((item, index) =>{
                       
             return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {reclamations.length - index}
              </TableCell>
               <TableCell align="right">
                 {item.user.username}
              </TableCell>
              <TableCell align="right">
                 {item.description}
              </TableCell>
                  <TableCell align="right">
                 {item.ticRef}
              </TableCell>
               
                <TableCell align="right">
                  {item.status}
              </TableCell>
              <TableCell align="right">
                  {formaterDateISO8601(item.date)}
              </TableCell>
                 <TableCell align="right">
                        <TextField
                         id="outlined-multiline-flexible"
                           label="Votre réponse"
                             multiline
                              maxRows={4}
                            onChange={(e)=>{
                              setResponse(e.target.value)
                            }}
                         />
                  <Button color='primary' variant='contained' onClick={()=>{
                    const dataRef = ref(db , 'reclamations/'+item.id+'/response')
                    set(dataRef , response)
                  }}>
                    Répondre
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