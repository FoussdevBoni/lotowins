import { push, ref, set } from "firebase/database";
import { db } from "../../../../firebaseConfig/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { contientElementsDifferents } from "../../../../functions/verifiyTabElement";

export function createTicket(tirage, formule, numerosChoisis, miseDeBase, prixAPayer, gainPotentiel, gainPotentielDoubleChance, numeroBase, numerosAssocies, dateHeureEnregistrement, doubleChance , user , navigate) {
// eslint-disable-next-line react-hooks/rules-of-hooks
  const ticket = {
    tirage, formule, numerosChoisis, miseDeBase, prixAPayer, gainPotentiel, gainPotentielDoubleChance, numeroBase, numerosAssocies, dateHeureEnregistrement, doubleChance, user
  }
   console.log(ticket)
  console.log(numerosChoisis)
  const ticketsRef = ref(db , 'tickets/'+user.id)
  
const mySoldeJeu = user.soldeJeu
const verifyTab1 = contientElementsDifferents(numerosChoisis)
const verifyTab2 = contientElementsDifferents(numerosAssocies)
const  verifyNumBase = numerosAssocies?.includes(numeroBase)
 if (mySoldeJeu===undefined||mySoldeJeu<prixAPayer) {
      alert('Votre solde jeu est insuffisant. Veillez le recharger')

 }else if(gainPotentiel>30000){
   alert('mise de base élevé gains supérieur à 30000')
 } else if (verifyNumBase===true) {
     alert("Le numéro de base ne doit pas être dans les numéros associés")
 } 
 
 else if (verifyTab1===false) {
        alert("Deux ou plusieurs numéros choisis sont identiques")

 } else if (verifyTab2===false) {
    alert("Deux ou plusieurs numéros associés sont identiques")
 } else{
    return    push(ticketsRef, ticket).then((data)=>{
    const allTicketsRef = ref(db , 'tickets/allTickets/'+data.key)
    set(
        allTicketsRef, ticket
    ).then(()=>{

        const soldeJeuRef = ref(db , 'users/'+user.id+'/soldeJeu')
        set(soldeJeuRef, parseFloat(mySoldeJeu)- parseFloat(prixAPayer))
        navigate('/mes-tickets')

    })
  })


  
 }

    
  

    if (formule === 'BASESIMPLE' || formule === 'BASETU2' || formule === 'BASETU3' || formule === 'BASETU4') {
        console.log("Numéro de base: " + numeroBase);
        console.log("Numéros associés: " + numerosAssocies.join(', '));
    } else {
        console.log("Numéros choisis: " + numerosChoisis.join(','));
    }

    console.log("Mise de base: " + miseDeBase.toFixed(2));
    console.log("Prix à payer: " + prixAPayer.toFixed(2));

    if (doubleChance) {
        console.log("Gain potentiel haut: " + (gainPotentielDoubleChance * 0.6).toFixed(2));
        console.log("Gain potentiel bas: " + (gainPotentielDoubleChance * 0.4).toFixed(2));
    } else {
        console.log("Gain potentiel: " + gainPotentiel.toFixed(2));
    }

    // Ajoutez d'autres détails du ticket ici

}