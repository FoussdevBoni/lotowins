import { Box, Button, Container, Grid, TextField, ListItem, ListItemIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { List, WhatsApp } from '@mui/icons-material';

function RechargerMonCompte({user}) {
   const [montJeu , setMontJeu] = useState(0)
   const recharger = ()=>{
    if (user.soldeGain>=montJeu) {
        const soldeGainRef= ref(db , 'users/'+user.id+'/soldeGain')
        const soldeJeuRef= ref(db , 'users/'+user.id+'/soldeJeu')
        set(soldeGainRef , parseFloat(user.soldeGain)- parseFloat(montJeu)).then(()=>{
              set(soldeJeuRef , parseFloat(user.soldeJeu)+ parseFloat(montJeu)).then(()=>{
                const depot = {
                  amount: montJeu , 
                   type: 'soldeJeu', 
                    deposant: user ,
                    date: new Date().toISOString()
                  }
                 push(ref(db, 'depots') , depot)
            })
        })

    }else{
        alert('Votre solde gain est insufisant')
    }
   }
    return (
     <Box marginTop={15}>
     <Container>
       <h1>Recharger le compte jeux</h1>
        <h3>1- Recharger à partir de mon compte gain</h3>
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
                type='number'
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'60%' }}
        />
        </Grid>
        <Grid xs={12} sm={6}>
             <Button color='primary' disabled={montJeu<=0||isNaN(montJeu)} variant='contained' onClick={()=>{
              recharger()
                 
             }}>
                  Recharger le compte jeu 
             </Button>
        </Grid>
        </Grid>
    <h3>2- Recharger avec l'aide d'un administrateur</h3>

     <Box style={{width: '100%'}}>
        <Button color='primary' variant='outlined' onClick={()=>{
        window.open('http://wa.me//+22999168119')
    }} style={{width: '100%'}}>
        Contacter le rechargeur 
    </Button>
     </Box>
     <br />
     <Box style={{width: '100%'}}>
         <Button color='primary' variant='outlined' onClick={()=>{
        window.open('http://wa.me//+22892449371')
    }}  style={{width: '100%'}}>
        Contacter le rechargeur Togo
    </Button>
     </Box>
       <br />
     <Box style={{width: '100%'}}>
         <Button color='primary' variant='outlined' onClick={()=>{
        window.open('http://wa.me//+22996211048')
    }}  style={{width: '100%'}}>
        Contacter le rechargeur 
    </Button>
     </Box>
      <br />
     <Box style={{width: '100%'}}>
         <Button color='primary' variant='outlined'   style={{width: '100%'}}>
        Contacter le rechargeur 
    </Button>
     </Box>
              
     </Container>
     
        </Box>
    );
}

export default RechargerMonCompte;