import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set , get, remove } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import  formaterDateISO8601, { getDaysDiff }  from '../../functions/formatDate';
import { ticketsByFormule, ticketsByTirage , ticketsByDate, ticketsByStatus } from '../../functions/filters';




export default function TableTickets({user}) {
  const [tickets , setTickets] = React.useState([])


  const navigate = useNavigate()
  React.useEffect(()=>{
    const dataRef = ref(db, 'tickets/allTickets')

    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setTickets(usersData)
        console.log(usersData)
      }


    })


     

  }, [])
  
  React.useEffect(()=>{
    tickets.forEach((ticket)=>{
       const daysDiff = getDaysDiff(ticket?.dateHeureEnregistrement)
       const ticketRef = ref(db, 'tickets/allTickets/'+ticket?.id)
       if (daysDiff>4) {
          remove(ticketRef)
       }
    })
  })
  
tickets.reverse()
  return (
    <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Tous les tickets
       </Typography>
       
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
              <TableCell align="right">Tirage</TableCell>
               <TableCell align="right">Date</TableCell>
             <TableCell align="right">Statut</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) =>{
            
            if (ticket.user.id === user.id) {
              
             return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {tickets.length - index}
              </TableCell>
               <TableCell align="right">
                 {ticket.tirage}
              </TableCell>
               <TableCell align="right">
                 {formaterDateISO8601(ticket.dateHeureEnregistrement)}
              </TableCell>
              <TableCell align="right">
                 {ticket.status ? ticket.status : 'En attente'}
              </TableCell>
              <TableCell align="right">
                <Button color='primary' onClick={()=>{
                    navigate(ticket.id)
                }}>Afficher</Button>
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