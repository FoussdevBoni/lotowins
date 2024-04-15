import { Box, Button, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Rechargements from './Rechargements';

function RechargeOtherCompte({selectedUser , user}) {
    const [montJeu, setMontJeu ]= useState(0)
   const [curentMontJeu, setCurentMontJeu ]= useState(0)

     const navigate = useNavigate()
    const recharger = (typeRecharge , amount)=>{
      const rechaRef = ref(db , 'users/'+selectedUser.id+'/'+typeRecharge)
      const mySoldRef = ref(db , 'users/'+user.id+'/soldeJeu')
       set(rechaRef , amount).then(()=>{
          set(mySoldRef , parseFloat(user.soldeJeu)-parseFloat(montJeu)).then(()=>{
             navigate(-1)
          })

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
        admin: user,
        date: new Date().toISOString()
      }
       push(depotsRef , depot)

     }
    }

 useEffect(()=>{

     if (selectedUser.soldeJeu) {
        setCurentMontJeu(selectedUser.soldeJeu)
    }else{
        setCurentMontJeu(0)
    }
 },[selectedUser.soldeJeu])
    return (
        <Box>
     <Container sx={{marginTop: 15}}>
      
        <br/>
         <Grid container>
             <Grid xs={12} sm={6}>
            <TextField
                placeholder="Saisir le montant à recharger"
                value={montJeu}
                 onChange={(e)=>{
                  setMontJeu(e.target.value)
                 }}
                variant="outlined"
                size="small"
                type='number'
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
        />
        </Grid>
        <Grid xs={12} sm={6}>
             <Button color='primary' variant='contained' disable={montJeu<500} onClick={()=>{
                if (parseFloat(montJeu)>0) {
                    if (user.soldeJeu>=montJeu) {
                    alert(user.soldeJeu)
                   recharger('soldeJeu' , parseFloat(montJeu)+parseFloat(curentMontJeu))
             }else{
                alert('Votre compte est insufissant')
             }
                 
         }
         else{
                alert('Veillez saisir une valeur valide')
             }
             }}>
                  Recharger le compte jeu
             </Button>
        </Grid>
        </Grid>
     </Container>
     <Rechargements user={user}/>
        </Box>
    );
}

export default RechargeOtherCompte;