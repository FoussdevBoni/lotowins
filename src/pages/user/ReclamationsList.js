import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import formaterDateISO8601 from '../../functions/formatDate';



function Row({item, index}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index}
        </TableCell>
        <TableCell align="right"> {item.ticRef}</TableCell>
        <TableCell align="right">  {formaterDateISO8601(item.date)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Mon message
              </Typography>
               <Typography component={'div'} variant='body1'>
                 {item.description}
               </Typography>
                <Typography variant="h6" gutterBottom component="div">
                Réponse de l'admin
              </Typography>
               <Typography component={'div'} variant='body1'>
                {item.response}
               </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function ReclamationsList({user}) {
      const [reclamations , setReclamations] = React.useState([])

     React.useEffect(()=>{
    const dataRef = ref(db, 'reclamations')
    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const reclamationsData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
       const  myReclamtions = reclamationsData.filter(item=>item.user.id===user.id)
        setReclamations(myReclamtions)
        console.log(myReclamtions)
      }
    })


  }, [])

  reclamations.reverse()
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ordre</TableCell>
            <TableCell align="right">Référence du ticket</TableCell>
            <TableCell align="right">date d'envoi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamations.map((row , index) => (
            <Row key={index} item={row} index={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}