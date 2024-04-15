import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set , get, push, remove } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import  formaterDateISO8601, { getDaysDiff }  from '../../functions/formatDate';
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

export default function TableTickets() {
  const [tickets , setTickets] = React.useState([])
  const [filteredByDate , setFilteredByDate ] = React.useState([])
    const [filteredByTirage , setFilteredByTirage ] = React.useState([])
  const [tirageSelected , setTirageSelected] = React.useState()
 // Initialiser un état local pour stocker les valeurs des inputs
  const [valeurs, setValeurs] = React.useState(Array(5).fill(0)); // Assurez-vous d'ajuster la taille de l'array en fonction du nombre d'inputs

  // Fonction pour mettre à jour les valeurs lorsqu'un champ de saisie change
  const handleChangement = (index, event) => {
    const nouvellesValeurs = [...valeurs];
    nouvellesValeurs[index] = parseInt(event.target.value, 10) || 0; // Utilisez parseInt pour obtenir un nombre
    setValeurs(nouvellesValeurs);
  };

  



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
        setFilteredTicket(usersData)
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
  const [ filteredTickets , setFilteredTicket ]= React.useState([])

  const ajouterNumGagnant = ()=>{

    filteredTickets.forEach(ticket=>{
      const dataRef1 = ref(db , 'tickets/allTickets/'+ticket.id+'/ticketsGagnant')
           const numerosAUtiliser = ticket.numerosChoisis === undefined? ticket.numerosAssocies : ticket.numerosChoisis;
           
            const status =  afficherResultatsGagnants(numerosAUtiliser ,valeurs , ticket.formule , ticket.numeroBase)
            const dataRef2 = ref(db , 'tickets/allTickets/'+ticket.id+'/status')

               set(dataRef1 , {
               tirage: tirageSelected, 
             numGagnants: valeurs
          }).then(()=>{
          if (ticket.status==='En attente') {
             set(dataRef2 , status).then(()=>{
                setValeurs(Array(5).fill(0))
             })
           }
    })

    })
   
  }

  filteredTickets.reverse()
  
async function validateTicket(amount, ticket) {

  console.log('Début de la fonction validateTicket');

  const soldeGainRef = ref(db, 'users/' + ticket.user.id + '/soldeGain');

   const validation = {
    user: ticket.user, 
    amount: amount, 
    date: new Date().toISOString(), 
    ticket: ticket
   }
  try {
    console.log('Avant get');
    const snapshot = await get(soldeGainRef);
    console.log('Après get');

    const data = snapshot.val() || 0;

    console.log('Avant set');
    await set(soldeGainRef, parseFloat(data) + parseFloat(amount)).then(()=>{
      const ticketRef = ref(db , 'tickets/allTickets/'+ticket.id+'/validated')
      const validatedAmount = ref(db , 'tickets/allTickets/'+ticket.id+'/validatedAmount')
      push(ref(db , 'validations') , validation)
      set(ticketRef , true)
      set(validatedAmount , amount)
      
    });
    console.log('Après set');
  } catch (error) {
    console.error('Error validating ticket:', error);
  }

  console.log('Fin de la fonction validateTicket');
}
 
  return (
    <Box sx={{marginTop: 10}}>
       <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Tous les tickets
       </Typography>
       
            
          
             <Container>
              <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={4} item>
                 <TextField
                id="filter"
                placeholder="Filtrer par date"
                 onChange={(e)=>{
                   const curentTickets =  ticketsByDate(tickets , e.target.value)
                   setFilteredTicket(curentTickets.reverse())
                    setFilteredByDate(curentTickets.reverse())
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'100%' }}
              />
              </Grid>
              <Grid xs={12} sm={12} md={4} item>
               <Autocomplete
               disablePortal
              id="combo-box-demo"
              options={tirages}
              renderInput={(params) => <TextField {...params} label="Les tirages" />}

              placeholder="Filtrer par tirage"
              onChange={ (event, newValue) => {
                const currentsTickets=  ticketsByTirage(filteredByDate , newValue)
                setFilteredTicket(currentsTickets.reverse())
                setFilteredByTirage(currentsTickets.reverse())
                setTirageSelected(newValue)

              }}

                 
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'100%' }}
              />
            </Grid>

            <Grid xs={12} sm={12} md={4} item>
                <Autocomplete
               disablePortal
              id="combo-box"
              options={formules}
              renderInput={(params) => <TextField {...params} label="Les formules" />}

              placeholder="Filtrer par formule"
              onChange={ (event, newValue) => {
                const currentsTickets=  ticketsByFormule(filteredByTirage ,newValue)
               setFilteredTicket(currentsTickets.reverse())
              }}

                 
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'100%' }}
              />
           </Grid>
             <Grid xs={12} sm={12} md={4} item>
               <Autocomplete
               disablePortal
              id="combo-box-demo"
              options={[
                'Gagné', 
                'Perdu', 
                'En attente'
              ]}
              renderInput={(params) => <TextField {...params} label="Filtrer par status" />}

              placeholder="Filtrer par status"
              onChange={ (event, newValue) => {
                const currentsTickets=  ticketsByStatus(filteredByDate , newValue)
                setFilteredTicket(currentsTickets.reverse())
              }}

                 
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'100%' }}
              />
            </Grid>
              </Grid>
             </Container>
              <br/><br/>
             <Container>
               <Grid container>
      {valeurs.map((valeur, index) => (
            <Grid item xs={12}  md= {2}>
         <input
          key={index}
          type="text"
          onChange={(event) => handleChangement(index, event)}
        />
       </Grid>
      ))}
              <Grid item xs={12} md={2}>
                <Button color='primary' variant="contained" onClick={ajouterNumGagnant}>Valider</Button>
            </Grid>
           </Grid>
             </Container>
           <br></br>  <br></br>
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth+100 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
             <TableCell align="right">Identifiant</TableCell>
              <TableCell align="right">Tirage</TableCell>
             <TableCell align="right">Formule</TableCell>
            <TableCell align="right">numéros choisis</TableCell>
            <TableCell align="right">Numéro de base</TableCell>
            <TableCell align="right">Numéros associés</TableCell>
          
            <TableCell align="right">Double chance</TableCell>
             <TableCell align="right">Gain</TableCell>
            <TableCell align="right">Actions</TableCell>
               <TableCell align="right">Date</TableCell>
             <TableCell align="right">Statut</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTickets.map((ticket, index) =>{
            
             if(ticket.status===undefined){
              const statusRef = ref(db, 'tickets/allTickets/'+ticket.id+'/status')
               set(statusRef , 'En attente')
             }


             return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {filteredTickets.length - index}
              </TableCell>
               <TableCell align="right">
                 {ticket.user.username}
              </TableCell>
              <TableCell align="right">
                 {ticket.tirage}
              </TableCell>
                <TableCell align="right">
                  {ticket.formule}
              </TableCell>
              <TableCell align="right">
                {
                 ticket.numerosChoisis===undefined ? 'null': ticket.numerosChoisis?.map((num)=>{
                    return<span>
                        {num}-
                    </span>
                 })
                }
              </TableCell>
               <TableCell align="right">
                 {
                 ticket.numeroBase===undefined ? 'null': ticket.numeroBase
                 }
              </TableCell>
              <TableCell align="right">
                 {
                 ticket.numerosAssocies===undefined ? 'null': ticket.numerosAssocies.map((num)=>{
                    return<span>
                        {num}-
                    </span>
                 })
                }
              </TableCell>
             
              <TableCell align="right">
                 { ticket.doubleChance ?'oui':'Non' }
              </TableCell>
               <TableCell align="right">
                   {ticket.doubleChance ? (
                <>
                    <p>Gain potentiel haut: {(ticket.gainPotentielDoubleChance * 0.6).toFixed(2)}</p>
                    <p>Gain potentiel bas: {(ticket.gainPotentielDoubleChance * 0.4).toFixed(2)}</p>
                </>
            ) : (
                <p>Gain potentiel: {ticket.gainPotentiel.toFixed(2)}</p>
            )}
              </TableCell>
               <TableCell align="right" >
                { !ticket.doubleChance ? 
                 <Button color='primary' variant='contained' disabled={ticket.status!=='Gagné'||ticket.validated===true}  onClick = {()=>{
                            validateTicket(ticket.gainPotentiel , ticket)
                           }}>
                    Valider 
                  </Button>: <Box>
                         <Button color='primary' variant='contained' disabled={ticket.status!=='Gagné'||ticket.validated!==undefined} sx={{textTransform: 'none'}}
                           onClick = {()=>{
                            validateTicket((ticket.gainPotentielDoubleChance * 0.6).toFixed(2) , ticket)
                           }}
                         >
                    Valider 60%
                  </Button>
                   <Box mt={2} />  
                    <Button color='primary' variant='contained' disabled={ticket.status!=='Gagné'||ticket.validated!==undefined} sx={{textTransform: 'none'}}
                     onClick = {()=>{
                            validateTicket((ticket.gainPotentielDoubleChance * 0.4).toFixed(2) , ticket)
                          
                       }}
                    >
                    Valider 40%
                  </Button>
                  </Box>
                }
                  
              </TableCell>
               <TableCell align="right">
                 {formaterDateISO8601(ticket.dateHeureEnregistrement)}
              </TableCell>
              <TableCell align="right">
                 {ticket.status ? ticket.status : 'En attente'}
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