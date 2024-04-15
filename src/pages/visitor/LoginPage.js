import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig/firebaseConfig';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const userData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

  
  };
 const navigate = useNavigate()
  const handleLogin = () => {
    // Faire quelque chose avec les données du formulaire, par exemple, les envoyer à un serveur
 signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
   console.log(userCredential)
    navigate('/mon-dashboard')

  })
  .catch((error) => {
    // Gérer les erreurs ici
    console.error("Erreur lors de la connexion : ", error.message);
  });

  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" mb={4}>
          Connexion
        </Typography>
        {/* Champ Email */}
        <TextField
          fullWidth
          id="email"
          label="Entrez votre email"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

        {/* Champ Mot de passe */}
        <TextField
          fullWidth
          id="password"
          label="Entrez votre mot de passe"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

     

        {/* Bouton d'envoi */}
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Se connecter
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
