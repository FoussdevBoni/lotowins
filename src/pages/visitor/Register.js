import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig/firebaseConfig';
import { get, onValue, ref, set } from 'firebase/database';
import { countries } from '../../data/countries';

const RegisterPage = () => {
  const userData = {
    username: '',
    phone: '',
    email: '',
    password: '',
    country: '',
    age: '',
  };

  function verifyUserName(username) {
        return /^[a-zA-Z0-9_]*$/.test(username);

  }
  const [formData, setFormData] = useState(userData);
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Vérifier si le champ username est modifié
 
     setFormData((prevState) => ({
      ...prevState,
     [id!==undefined ? id : 'country']: value,
    }));
  
   

  
  };

const handleRegister = () => {
  // Vérifier l'unicité du nom d'utilisateur avant de créer un nouvel utilisateur
  get(ref(db, 'users'))
    .then((snapshot) => {
      const data = snapshot.val();

      if (data) {
        const users = Object.entries(data);

        if (users.some(([userId, userData]) => userData.username === formData.username||users.some(([userId, userData]) => userData.phone === formData.phone))) {
          alert("Nom utilisateur ou numéro d'utilisateur déjà utilisé");
        } else {
          // Créer un nouvel utilisateur dans l'authentification Firebase
          createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
              const userRef = ref(db, '/users/' + userCredential.user.uid);
              const userForm = {
                username: formData.username,
                email: formData.email,
                country: formData.country,
                age: formData.age,
                soldeJeu: 0,
                soldeGain: 0,
                id: userCredential.user.uid,
                phone: formData.phone,
                date: new Date().toISOString()
              };

              // Enregistrer les détails de l'utilisateur dans la base de données
              set(userRef, userForm);
              console.log('Inscription réussie !');
            })
            .catch((error) => {
              alert("Erreur lors de l'inscription ");
            });
        }
      } else {
        // Aucun utilisateur avec le même nom d'utilisateur, créer un nouvel utilisateur
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            const userRef = ref(db, '/users/' + userCredential.user.uid);
            const userForm = {
              username: formData.username,
              email: formData.email,
              country: formData.country,
              age: formData.age,
              soldeJeu: 0,
              soldeGain: 0,
              id: userCredential.user.uid,
              phone: formData.phone,
              date: new Date().toISOString()
            };

            // Enregistrer les détails de l'utilisateur dans la base de données
            set(userRef, userForm);
            console.log('Inscription réussie !');
          })
          .catch((error) => {
            alert("Erreur lors de l'inscription : ");
          });
      }
    })
    .catch((error) => {
     alert("Erreur lors de la vérification du nom d'utilisateur" );
    });
};


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" mb={4}>
          Inscription
        </Typography>

        {/* Champ Nom */}
        <TextField
          fullWidth
          id="username"
          label="Créer un identifiant"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

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
          label="Créer un mot de passe"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

        {/* Champ Numéro de téléphone */}
        <TextField
          fullWidth
          id="phone"
          label="Entrez votre numéro de téléphone"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

        {/* Champ Pays */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="pays-label">Choisir un pays</InputLabel>
          <Select labelId="pays-label" id="country" label="Choisir un pays" onChange={handleChange}>
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
        />

        {/* Bouton d'envoi */}
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={()=>{
          if (verifyUserName(formData.username)===true) {
            handleRegister()
          }else{
            alert("Le nom d'utilisateur ne doit pas contenir des caractères spéciaux ni d'espace")
          }
        }}>
          S'inscrire
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
