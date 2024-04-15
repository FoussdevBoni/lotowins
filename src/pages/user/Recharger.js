import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set } from 'firebase/database';
import { Box, Button, TextField , Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig/firebaseConfig';
import { usersById } from '../../functions/filters';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('F', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Recharger() {
  const [users , setUsers] = React.useState([])
  const [benficaire , setBeneficaire]= React.useState()
  const [username , setUsername] = React.useState()
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
      }
    })
  }, [])

  const navigate = useNavigate()
  return (
    <Box marginTop={15}>

     <Container>
       <TextField
                id="filter"
                placeholder="Saisir soignesement le nom d'utilisateur du bénéficiaire"
                 onChange={(e)=>{
                  setUsername(e.target.value)
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
              />
                <Button color='primary' variant='contained'
      onClick={()=>{
       
        users.forEach(user=>{
            if (user.username===username) {
                 setBeneficaire(user)
                 console.log(user)
                 navigate("/recharger/"+user.id)
              }
           })
      
      }}
      >
        Continuer
      </Button>
     </Container>
    
  
    </Box>
  );
}