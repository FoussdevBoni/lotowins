import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Box, Button, TextField , Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {usersById} from '../../functions/filters';


export default function DashboardAdmin() {
  const [users , setUsers] = React.useState([])
  const [filteredUsers , setFilteredUsers] = React.useState([])
  React.useEffect(()=>{
    const dataRef = ref(db, 'users')

    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setUsers(usersData)
        console.log(usersData)
        setFilteredUsers(usersData)
      }
    })

  }, [])
 filteredUsers.reverse()

  const navigate = useNavigate()
  return (
    <Box>

     <Container>
       <TextField
                id="filter"
                placeholder="Filtrer par le nom d'utilisateur"
                 onChange={(e)=>{
                   const curentTickets =  usersById(users , e.target.value)
                   setFilteredUsers(curentTickets.reverse())
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
              />
     </Container>
     <br/>   <br/>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Utilisateur</TableCell>
             <TableCell align="right">Tel</TableCell>
              <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Solde Jeu</TableCell>
            <TableCell align="right">Solde gain</TableCell>
            <TableCell align="right">Tickets</TableCell>
             <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {user.username}
              </TableCell>
               <TableCell align="right">
                  {user.phone}
              </TableCell>
              <TableCell align="right">
                 {user.email}
              </TableCell>
              <TableCell align="right">
                <Button color="primary" variant="contained"
                onClick={()=>{
                  navigate('recharger/'+user.id)
                }}
                >Recharger</Button>
              </TableCell>
              <TableCell align="right">
                {user.soldeJeu ? user.soldeJeu : 0} CFA
              </TableCell>
              <TableCell align="right">
                  {user.soldeGain ? user.soldeGain : 0} CFA 
              </TableCell>
              <TableCell align="right">
                 {
                  user.adminStatus ?   <Button style={{backgroundColor: 'red', color: 'white'}} variant="contained" 
                onClick={()=>{
                  const userRef = ref(db, 'users/'+user.id+'/adminStatus')
                  set(userRef , false)
                }}
                >
                  Désactiver
                </Button>:   <Button color="primary" variant="contained" 
                onClick={()=>{
                  const userRef = ref(db, 'users/'+user.id+'/adminStatus')
                  set(userRef , true)
                }}
                >
                  Nommer admin
                </Button>
                 }

              </TableCell>
               <TableCell align="right">
                <Button color="primary" onClick={()=>{
                  navigate('user-details/'+user.id)
                }}>
                  Plus de details
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}