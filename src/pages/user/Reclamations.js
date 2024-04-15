// ReclamationForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import { push, ref } from 'firebase/database';
import { db } from '../../firebaseConfig/firebaseConfig';
import ReclamationsList from './ReclamationsList';

const Reclamation = ({user}) => {
  const [details, setDetails] = useState('');
  const [ticketReference, setTicketReference] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre la réclamation (envoyer à l'API, etc.)
    console.log('Détails de la réclamation:', details);
    console.log('Référence du ticket:', ticketReference);
    // Réinitialisez les champs après la soumission si nécessaire
    
    const reclamaRef = ref(db, 'reclamations')
    const reclamation = {
         user: user, 
         description: details, 
         ticRef: ticketReference, 
         date: new Date().toISOString(),
         status: 'En attente'
    }
    push(reclamaRef , reclamation).then((data)=>{
      setDetails('');
    setTicketReference('');
    alert('Reclamation envoyée avec succès')
    }).catch(()=>{
        alert("Une erreur s'est produite lors de la soumission de votre reclamation. Veiller essayer")
    })
  };


  
  return (
    <Box>
        <Container sx={{marginTop: 12}}>
              <form onSubmit={handleSubmit}>
      <TextField
        label="Détails de la réclamation"
        variant="outlined"
        fullWidth
        required
        multiline
        rows={4}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Référence du ticket"
        variant="outlined"
        fullWidth
        value={ticketReference}
        onChange={(e) => setTicketReference(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Soumettre
      </Button>
    </form>
        </Container>
        <ReclamationsList user={user}/>
    </Box>
  );
};

export default Reclamation;
