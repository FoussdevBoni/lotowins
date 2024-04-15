import { Box, Button, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function RechargePage({selectedUser}) {
    const [montJeu, setMontJeu ]= useState(0)
    const [montGain, setMontGain ]= useState(0)
   const [curentMontJeu, setCurentMontJeu ]= useState(0)
    const [curentMontGain, setCurentMontGain ]= useState(0)

     const navigate = useNavigate()
    const recharger = (typeRecharge , amount)=>{
      const rechaRef = ref(db , 'users/'+selectedUser.id+'/'+typeRecharge)
       set(rechaRef , amount).then(()=>{
          navigate(-1)
       })


      // Créer l'historique de chargement
      const recharData = {
        amount: amount , 
        type: typeRecharge, 
        deposant: selectedUser ,
        date: new Date().toISOString()
      }
      const dataRef = ref(db , 'histoRecharge')
     push(dataRef , recharData)
     
     if(typeRecharge==='soldeJeu'){
       const depotsRef= ref(db , 'depots')

       const depot = {
        amount: montJeu , 
        type: typeRecharge, 
        deposant: selectedUser ,
        date: new Date().toISOString()
      }
       push(depotsRef , depot)

     }
    }

 useEffect(()=>{
    // Récupérer les soldes actuels
    if (selectedUser.soldeGain) {
        setCurentMontGain(selectedUser.soldeGain)
    }else{
        setCurentMontGain(0)
    }

     if (selectedUser.soldeJeu) {
        setCurentMontJeu(selectedUser.soldeJeu)
    }else{
        setCurentMontJeu(0)
    }
 },[])
    return (
     <Box marginTop={15}>
     <Container>
        <Grid container>
             <Grid xs={12} sm={6}>
            <TextField
                id="filter"
                value={montGain}
                placeholder="Saisir le montant à recharger"
                 onChange={(e)=>{
                   setMontGain(e.target.value)
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
        />
        </Grid>

        <Grid xs={12} sm={6}>
             <Button color='primary' variant='contained' onClick={()=>{
                recharger('soldeGain' , parseFloat(montGain)+parseFloat(curentMontGain))
             }}>
                  Recharger le compte gain
             </Button>
        </Grid>
        </Grid>
        <br/>
         <Grid container>
             <Grid xs={12} sm={6}>
            <TextField
                id="filter"
                placeholder="Saisir le montant à recharger"
                value={montJeu}
                 onChange={(e)=>{
                  setMontJeu(e.target.value)
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
        />
        </Grid>
        <Grid xs={12} sm={6}>
             <Button color='primary' variant='contained' onClick={()=>{
                recharger('soldeJeu' , parseFloat(montJeu)+parseFloat(curentMontJeu))
                 
             }}>
                  Recharger le compte jeu
             </Button>
        </Grid>
        </Grid>
     </Container>
     
        </Box>
    );
}

export default RechargePage;