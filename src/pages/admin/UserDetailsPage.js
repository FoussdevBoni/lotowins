import { CalendarMonth, Call, ConfirmationNumberSharp, Mail, Person, Room, Star } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Modal, Slide, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ref, remove } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import UserTicketsPages from './UserTickets';
import formaterDateISO8601 from '../../functions/formatDate';

function UserDetails({user}) {
  const [copied , setCopied] = useState(false)
  const [view , setView] = useState()
  const [confirmed , setConfirmed] = useState(false)
    const [open , setOpen] = useState(false)
   const userRef = ref(db ,'users/'+user.id)

const deleteUser = ()=>{
    remove(userRef).then(()=>{
      setOpen(false)
    })
  }
  const navigate = useNavigate()
  const handleCloseModal = ()=>{
    setOpen(false)
  }
  const Confirm = ()=>{
    return(
       <Box>
             <Typography component={'div'} textAlign={'center'} fontWeight={'900'}>
              Voulez-vraiment supprimer  {user.lastName} {user.firstName} ?
             </Typography>
             <Button sx={{ flex: 1, marginLeft: '0.5rem' }}  style={{backgroundColor: 'hsl(353, 100%, 78%)'}} variant='contained'
            onClick={()=>{
              deleteUser()
            }}
          >
           Oui
          </Button>
             <Button sx={{ flex: 1, marginLeft: '0.5rem' }}  style={{backgroundColor: 'hsl(353, 100%, 78%)'}} variant='contained'
            onClick={()=>{
               setOpen(false)
            }}
          >
           non
          </Button>
          </Box>
    )
  }
    return (
        <Box padding={0} >
            <h1 style={{textAlign: 'center'}}>Les détails sur {user.username}</h1>
           <Grid container marginTop={10}>
          
              <Grid item xs={12} md={6}>
                   <List>
     <ListItem>
        <ListItemAvatar>
           <Avatar>
             <Person />
           </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Utilisateur" secondary={user.username} />
      </ListItem>
        <ListItem>
        <ListItemAvatar>
           <Avatar>
             <Mail />
           </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email de l'utilisateur" secondary={user.email} />
      </ListItem>
      
       <ListItem>
        <ListItemAvatar>
           <Avatar>
             <Call />
           </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Numéro de téléphone" secondary={user.phone} />
      </ListItem>
       <ListItem>
        <ListItemAvatar>
           <Avatar>
             <Room />
           </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pays" secondary={user.country} />
      </ListItem>
         <ListItem>
        <ListItemAvatar>
           <Avatar>
             <CalendarMonth />
           </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Date d'inscription" secondary={formaterDateISO8601(user.date)} />
      </ListItem>
      </List>
        </Grid>
        <Grid xs={12} md={6}>
           <Box sx={{overflowY: 'auto' , maxHeight: '100vh'}}>
              <UserTicketsPages user={user}/>
           </Box>
        </Grid>
     </Grid> 
    
           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
         
          <Button sx={{ flex: 1, marginLeft: '0.5rem' }}  style={{backgroundColor: 'hsl(353, 100%, 78%)'}} variant='contained'
            onClick={()=>{
              setOpen(true)
            }}
          >
            Desactiver le client
          </Button>

           <Button sx={{ flex: 1, marginLeft: '0.5rem' }}  style={{backgroundColor: 'hsl(353, 100%, 78%)'}} variant='contained'
            onClick={()=>{
              setOpen(true)
            }}
          >
            Supprimer le client
          </Button>
           
        </Box>
     <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Container  maxWidth="sm" style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    marginTop: '20px',
    maxHeight: window.innerHeight,
    overflowY: 'auto',
   
  }} className='container'>
    <Confirm />
  </Container>
  </Slide>
  </Modal>
    </Box>
    );
}

export default UserDetails;