import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import formaterDateISO8601, { dateISO8601 } from '../../functions/formatDate';
import { blue } from '@mui/material/colors';

function Statistics(props) {
    const [usersNbr, setUsersNbr] = useState(0)
    const [ticketNbr, setTicketsNbr] = useState(0)
    const [totalDepot , setTotalDepot] = useState(0)
    const [totalGain , setTotalGain] = useState(0)
    const [validations, setValidations] = useState(0)
    const [totalRetraits , setTotalRetraits] = useState(0)
    const [totalJeu , setTotalJeu] = useState(0)
    const [totalApayer , setTotalApayer] = useState(0)

    useEffect(()=>{
    // Récupérons le nombre de clients
    const usersRef = ref(db , 'users')
    onValue(usersRef , snapshot=>{
        setUsersNbr(snapshot.size)

        const data = snapshot.val()

      const usersArray = Array.isArray(data) ? data : Object.values(data);   
      
       const totalGain = usersArray.reduce((acc, element) => {
          if(element.soldeGain!==undefined){
             return acc + parseFloat(element.soldeGain)
          }else{
            return acc
          }
                               
     }, 0);

     setTotalGain(totalGain)

     console.log('Total des gains' , totalGain)

      const totalJeu = usersArray.reduce((acc, element) => {
          if(element.soldeJeu!==undefined){
             return acc + parseFloat(element.soldeJeu)
          }else{
            return 0
          }
     }, 0);

     console.log('Total des soldes jeu' , totalJeu)
     setTotalJeu(totalJeu)
 })



// Récupérons le nombre de tickets enregistré aujourdhui
  const ticketsRef = ref(db , 'tickets/allTickets')
onValue(ticketsRef, (snapshot) => {
  const data = snapshot.val();
  const newDate = dateISO8601(new Date().toISOString());

  // Assurez-vous que data est un tableau, si ce n'est pas déjà le cas
  const ticketsArray = Array.isArray(data) ? data : Object.values(data);

  const newTickets = ticketsArray.filter((ticket) => {
    // Utilisez des opérateurs de comparaison appropriés pour les dates
    return dateISO8601(ticket.dateHeureEnregistrement) === newDate;
  });

// Total des tickets enregistre
  console.log('Nouveaux tickets du jour :', newTickets);
  const nbrTicket = newTickets.length;
  console.log('Nombre de tickets :', nbrTicket);
  setTicketsNbr(nbrTicket)

  // Récuprer le total à payer 
 const totalApayer = newTickets.reduce((acc, element) => {
         return acc + parseFloat(element.prixAPayer)
    ;
}, 0);

  
console.log('Total à payer pour ce jour ' , totalApayer)

setTotalApayer(totalApayer)

// Total des validations 

 const totalValide = newTickets.reduce((acc, element) => {
        if(element.validatedAmount!==undefined){
                 return acc + parseFloat(element.validatedAmount)
            
        }else{
            return acc
        }
    ;
}, 0);

console.log('Total des validations pour ce jour ' , totalValide)
setValidations(totalValide)
});


// Récupérer 

 const retraitsRef = ref(db , 'retraits')

onValue(retraitsRef, (snapshot) => {
  const data = snapshot.val();
  const newDate = dateISO8601(new Date().toISOString());
  // Assurez-vous que data est un tableau, si ce n'est pas déjà le cas
  const retraitsArray = Array.isArray(data) ? data : Object.values(data);

  const newRetraits = retraitsArray.filter((retrait) => {
    // Utilisez des opérateurs de comparaison appropriés pour les dates
    return dateISO8601(retrait.date) === newDate;
  });

  console.log('Nouveaux tickets du jour :', newRetraits);
 const retraitTotal = newRetraits.reduce((acc, element) => {
    return acc + parseFloat(element.amount);
}, 0);

  
console.log('Total des rtraits pour ce jour ' , retraitTotal)
  setTotalRetraits(retraitTotal)



 
});

// Total des dépots journaliers 

 const DepotsRef = ref(db , 'depots')

onValue(DepotsRef, (snapshot) => {
  const data = snapshot.val();
  const newDate = dateISO8601(new Date().toISOString());
  // Assurez-vous que data est un tableau, si ce n'est pas déjà le cas
  const depotsArray = Array.isArray(data) ? data : Object.values(data);

  const newDepots = depotsArray.filter((retrait) => {
    // Utilisez des opérateurs de comparaison appropriés pour les dates
    return dateISO8601(retrait.date) === newDate;
  });

  console.log('Nouveaux depost du jour :', newDepots);

 const depotsTotal = newDepots.reduce((acc, element) => {
         return acc + parseFloat(element.amount)
    ;
}, 0);

  
console.log('Total des depots pour ce jour ' , depotsTotal)
setTotalDepot(depotsTotal)
 
});

} , [])
  
const data = [
  {
    text: "Le nombre d'inscrit", 
    val: usersNbr
  },
  {
    text: "Total journalier des retraits",
    val: totalRetraits
  },
  {
    text: "Nombre journalier de tickets",
    val: ticketNbr
  },
  
   {
    text: "Total journalier des dépots", 
    val: totalDepot
  },
  {
    text: "Total journalier des validations",
    val: validations
  },
   {
    text: "Le total des solde gain", 
    val: totalGain
  },
  {
    text: "Total des soldes jeu ",
    val: totalJeu
  },
  {
    text: "Total à payer ",
    val: totalApayer
  },
]

    return (
        <Box>
            <Grid container spacing={2}>
               {
                data.map(item=>{
                  return(
                    <Grid item xs={12} sm={12} md={4}>
                       <Card>
    <CardContent>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">{item.text}</Typography>
        </Grid>
        <Grid item>
          <Box>{item.val}</Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
                    </Grid>
                  )
                })
               }
            </Grid>  
        </Box>
    );
}

export default Statistics;