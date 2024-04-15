import { combinaisons } from "./combinaisons";
import { createTicket } from "./createTicket";
import { verifierHeureCloture } from "./verifierHeure";

export function jouerLoto(formData , user, navigate , submitting) {
    // Récupérer la date et l'heure actuelles en UTC
    let now = new Date();
    let dateHeureEnregistrement = now.toISOString();

    let tirage = formData.tirage
    let formule = formData.formule;
    let numerosChoisis = null ;
    let miseDeBase = parseFloat(formData.miseDeBase);

    // Gérer la saisie des numéros de base et des numéros associés
    let numeroBase ;
    let numerosAssocies

    if (formule === 'BASESIMPLE' || formule === 'BASETU2' || formule === 'BASETU3' || formule === 'BASETU4') {

        numeroBase = parseInt(formData.numeroBase);
        
        numerosAssocies = formData.numerosAssocies.split(',').map(Number);
        
    }else{
        numeroBase = null;
       numerosAssocies = null;
      numerosChoisis = formData.numerosChoisis.split(',').map(Number)
    }

    // Gérer la double chance
    let doubleChance = false;
    if (["C7h", "C10h", "C13h", "C16h", "C21h", "C23h"].includes(tirage)) {
        let choixDoubleChance = window.confirm("Voulez-vous jouer en double chance?");
        doubleChance = choixDoubleChance;
    }
   
    // Calculer le prix à payer et le gain potentiel
    let prixAPayer;
    let gainPotentiel;

    switch (formule) {
        case 'NA1POTO':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 1);
            gainPotentiel = miseDeBase * 50;
            break;
        case 'NAP1SIMPLE':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 1);
            gainPotentiel = miseDeBase * 15;
            break;
        case 'NAP2SIMPLE':
        case 'NAP2TU2':
        case 'NAP2TU3':
        case 'NAP2TU4':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 2);
            gainPotentiel = miseDeBase * (formule === 'NAP2SIMPLE' ? 300 : (formule === 'NAP2TU2' ? 3000 : (formule === 'NAP2TU3' ? 1200 : 600)));
            break;
        case 'NAP3':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 3);
            gainPotentiel = miseDeBase * 3000;
            break;
        case 'NAP4':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 4);
            gainPotentiel = miseDeBase * 9000;
            break;
        case 'NAP5':
            prixAPayer = miseDeBase * combinaisons(numerosChoisis.length, 5);
            gainPotentiel = miseDeBase * 50000;
            break;
        case 'BASESIMPLE':
        case 'BASETU2':
        case 'BASETU3':
        case 'BASETU4':
            prixAPayer = miseDeBase * (numerosAssocies.length);
            gainPotentiel = miseDeBase * (formule === 'BASESIMPLE' ? 300 : (formule === 'BASETU2' ? 3000 : (formule === 'BASETU3' ? 1200 : 600)));
            break;
        default:
            alert("Formule non reconnue");
            return;
    }

    // Vérifier l'heure de clôture pour le tirage sélectionné
    let heureCloture;
    let minutesCloture;

    switch (tirage) {
        case 'B11h':
            heureCloture = 9;
            minutesCloture = 53;
            break;
        case 'B14h':
            heureCloture = 12;
            minutesCloture = 53;
            break;
        case 'B18h':
            heureCloture = 16;
            minutesCloture = 53;
            break;
        case 'C7h':
            heureCloture = 6;
            minutesCloture = 50;
            break;
        case 'C10h':
            heureCloture = 9;
            minutesCloture = 55;
            break;
        case 'C13h':
            heureCloture = 12;
            minutesCloture = 55;
            break;
        case 'C16h':
            heureCloture = 15;
            minutesCloture = 55;
            break;
        case 'C21h':
            heureCloture = 20;
            minutesCloture = 55;
            break;
        case 'C23h':
            heureCloture = 22;
            minutesCloture = 55;
            break;
        case 'T14h':
            heureCloture = 12;
            minutesCloture = 55;
            break;
        case 'T19h':
            heureCloture = 17;
            minutesCloture = 55;
            break;
        default:
            alert("Tirage non reconnu");
            return;
    }

    if (verifierHeureCloture(heureCloture, minutesCloture)) {
        alert("La sélection pour le tirage " + tirage + " est terminée. Revenez demain !");
        return;
    }
 console.log('Numéros choisis', numerosChoisis)
     return createTicket(tirage, formule, numerosChoisis, miseDeBase, prixAPayer, gainPotentiel, gainPotentiel, numeroBase, numerosAssocies, dateHeureEnregistrement, doubleChance , user , navigate , submitting)
  
}
