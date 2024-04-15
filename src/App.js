// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Navigation from './navigation/Navigation';
import { afficherResultatsGagnants, verifierGagnantsBASESIMPLE } from './functions/verifiyTicketGagnant';

import { createTheme , Button } from '@mui/material';
import CenteredContentPage from './components/widgets/Container/MyContainer';


// Créer un thème personnalisé avec la couleur principale modifiée
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',  // Remplacez cette valeur par la couleur de votre choix
    },
  },
});

function App() {

// Exemple d'utilisation avec les numéros gagnants saisis par l'administrateur
let numerosGagnants = [45, 78, 63, 1, 58];

// Exemple de récupération des tickets depuis la base de données (à remplacer par la vraie récupération)
let ticketDansLaBase = [42, 56, 63, 12, 25]; 
   
    


// Appel de la fonction pour afficher les résultats des gagnants
const resultat = afficherResultatsGagnants(ticketDansLaBase, numerosGagnants , 'NAP2TU2');
console.log("Le résultat" , resultat )
// Les numéros gagnants

// Les choix du client
const numeroBaseClient = 58;
const numerosAssociesClient = [1, 12, 22];

// Vérification avec BASESIMPLE
const gagnantBASESIMPLE = verifierGagnantsBASESIMPLE( numeroBaseClient, numerosAssociesClient, numerosGagnants);

// Affichage du résultat
console.log("Le client a-t-il gagné avec BASESIMPLE ?", gagnantBASESIMPLE);

  return (
      <ThemeProvider theme={theme}>
         <Box flex={1}> 
        <Navigation />
    
     </Box>
      </ThemeProvider>
  );
}

export default App;
