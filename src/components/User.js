import { Call, ConfirmationNumberSharp, Mail, Room, Star } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Modal, Slide, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ref, remove } from 'firebase/database';
import { db } from '../../../../Backend/config';

function UserDetails({user}) {
  const [copied , setCopied] = useState(false)
  const [view , setView] = useState()
  const [confirmed , setConfirmed] = useState(false)
    const [open , setOpen] = useState(false)
   const userRef = ref(db ,'users/clients'+user.id)

const deleteDriver = ()=>{
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
              deleteDriver()
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
        <Box padding={10}>
           <Grid container marginTop={10}>
            <Grid item xs={12} md={6}>
                <Box>
                    <Avatar src=""   sx={{
                width: '100px', // Ajustez la largeur de l'Avatar selon vos besoins
                height: '100px', // Ajustez la hauteur de l'Avatar selon vos besoins
                margin: '0 auto', // Pour centrer l'Avatar horizontalement
                display: 'block',
                marginTop: 2 // Pour centrer l'Avatar horizontalement
              }}/>
                    <Typography component={'h3'} variant='h4' textAlign={'center'}>
                        {user.username}                        
                        
                    </Typography>
                     <Typography component={'h4'} variant='h5' textAlign={'center'}>
                        {user.email}                        
                        
                    </Typography>
                </Box>
            </Grid>
              <Grid item xs={12} md={6}>
                   <List>
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
     
      </List>
        </Grid>
     </Grid> 
    
           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
         
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