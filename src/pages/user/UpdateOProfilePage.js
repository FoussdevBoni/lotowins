import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig/firebaseConfig';
import { get, onValue, ref, set } from 'firebase/database';
import { countries } from '../../data/countries';

const UpdateProfilePage = ({user}) => {
  const userData = {
    username: user.username,
    phone: user.phone,
    email: user.email,
    country: user.country,
    age: user.age
  };
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
     [id!==undefined ? id : 'country']: value,
    }));

  
  };

const handleRegister = () => {
  
      const userRef = ref(db, '/users/' + user.id);
      const userForm = {
        username: formData.username,
        email: formData.email,
        country: formData.country,
        age: formData.age,
        soldeJeux: user.soldeJeux ,
        soldeGain: user.soldeGain , 
        id: user.id,
        phone: formData.phone,
        date: user.date
      };

     
      set(userRef , userForm).then(()=>{
        alert("Votre profile a été mis à jour avec succès")
      })
    
   
};


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" mb={4}>
          Modifier mon profile
        </Typography>

        {/* Champ Nom */}
        <TextField
          fullWidth
          id="username"
          label="Créer un identifiant"
          variant="outlined"
          margin="normal"
          value={formData.username}
        />

        {/* Champ Email */}
        <TextField
          fullWidth
          id="email"
          label="Entrez votre email"
          variant="outlined"
          margin="normal"
          value={formData.email}
        />

        

        {/* Champ Numéro de téléphone */}
        <TextField
          fullWidth
          id="phone"
          label="Entrez votre numéro de téléphone"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          value={formData.phone}
        />

        {/* Champ Pays */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="pays-label">Choisir un pays</InputLabel>
          <Select labelId="pays-label" id="country" label="Choisir un pays"     onChange={handleChange} value={formData.country}>
            
            {
                countries.map(country => {
                    return (
                     <MenuItem value={country.nom}>
                        {country.nom}
                     </MenuItem>
                    )
                })
            }            
          </Select>
        </FormControl>

        {/* Champ Age */}
        <TextField
          fullWidth
          id="age"
          label="Entrez votre âge"
          type="number"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          value={formData.age}
        />

        {/* Bouton d'envoi */}
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Modifier
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateProfilePage;
