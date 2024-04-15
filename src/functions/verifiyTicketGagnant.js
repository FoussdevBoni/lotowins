
// Fonction pour vérifier les gagnants pour NA1POTO (Numéro à la première position)
function verifierGagnantsNA1POTO(ticket, numerosGagnants) {
    if (numerosGagnants) {
         return ticket[0] === numerosGagnants[0];
    }
}

// Fonction pour vérifier les gagnants pour NAP1SIMPLE (Numéro à une position, peu importe laquelle)
function verifierGagnantsNAP1SIMPLE(ticket, numerosGagnants) {
    return ticket.some(numero => numerosGagnants.includes(numero));
}

// Fonction pour vérifier les gagnants pour NAP2SIMPLE (Deux numéros identiques, peu importe la position)
function verifierGagnantsNAP2SIMPLE(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.includes(numero));
    console.log(numerosIdentiques)
    return numerosIdentiques.length >= 2;
}

// Fonction pour vérifier les gagnants pour NAP2TU2 (Deux numéros, les deux premiers dans n'importe quel ordre)
function verifierGagnantsNAP2TU2(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.slice(0, 2).includes(numero));
    return numerosIdentiques.length >= 2;
}

// Fonction pour vérifier les gagnants pour NAP2TU3 (Deux numéros, les trois premiers dans n'importe quel ordre)
function verifierGagnantsNAP2TU3(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.slice(0, 3).includes(numero));
    return numerosIdentiques.length >= 2;
}

// Fonction pour vérifier les gagnants pour NAP2TU4 (Deux numéros, les quatre premiers dans n'importe quel ordre)
function verifierGagnantsNAP2TU4(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.slice(0, 4).includes(numero));
    console.log( numerosGagnants.slice(0, 4))
    console.log(numerosIdentiques)
    return numerosIdentiques.length >= 2;
}

// Fonction pour vérifier les gagnants pour NAP3 (Trois numéros identiques, peu importe la position)
function verifierGagnantsNAP3(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.includes(numero));
    return numerosIdentiques.length >= 3;
}

// Fonction pour vérifier les gagnants pour NAP4 (Quatre numéros identiques, peu importe la position)
function verifierGagnantsNAP4(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.includes(numero));
    return numerosIdentiques.length >= 4;
}

// Fonction pour vérifier les gagnants pour NAP5 (Cinq numéros identiques, peu importe la position)
function verifierGagnantsNAP5(ticket, numerosGagnants) {
    const numerosIdentiques = ticket.filter(numero => numerosGagnants.includes(numero));
    return numerosIdentiques.length === 5;
}

// Fonction pour vérifier les gagnants pour BASESIMPLE
/*function verifierGagnantsBASESIMPLE(ticket, numeroBase, numerosAssocies) {
    const numeroBasePresent = ticket.includes(numeroBase);
    const numerosAssociesPresent = ticket.some(numero => numerosAssocies.includes(numero));
    return numeroBasePresent && numerosAssociesPresent;
}*/


// numerosGagnants , numeroBase , numerosAssocies

// Fonction pour vérifier les gagnants pour BASESIMPLE
export  function verifierGagnantsBASESIMPLE(numeroBase, numerosAssocies, numerosGagnants) {
    const numeroBasePresent = numerosGagnants.includes(numeroBase);
    const numerosAssociesFiltres = numerosAssocies.filter(numero => numero !== numeroBase);
       console.log('numéro base' , numeroBase)
       console.log('numéros associés' , numerosAssocies);
        console.log('numéros gagnant' , numerosGagnants);

        console.log("numero associes exclus numéro de bas" , numerosAssociesFiltres )

    const numerosAssociesPresent = numerosAssociesFiltres.some(numero => numerosGagnants.includes(numero));

    return numeroBasePresent && numerosAssociesPresent;
}




// Fonction pour vérifier les gagnants pour BASETU2
function verifierGagnantsBASETU2(numeroBase, numerosAssocies, numerosGagnants) {
    const numerosAssociesFiltres = numerosAssocies.filter(numero => numero !== numeroBase);

    // Condition 1 : Le numéro de base doit être présent parmi les deux premiers numéros gagnants
    const numeroBasePresent = numerosGagnants.slice(0, 2).includes(numeroBase);

    // Condition 2 : Au moins un des numéros associés (en excluant le numéro de base) doit être présent parmi les deux premiers numéros gagnants
    const numerosAssociesPresent = numerosAssociesFiltres.some(numero => numerosGagnants.slice(0, 2).includes(numero));

    return numeroBasePresent && numerosAssociesPresent;
}

// Fonction pour vérifier les gagnants pour BASETU3
function verifierGagnantsBASETU3( numeroBase, numerosAssocies, numerosGagnants) {
    const numeroBasePresent = numerosGagnants.slice(0, 3).includes(numeroBase);
    const numerosAssociesFiltres = numerosAssocies.filter(numero => numero !== numeroBase);
    const numerosAssociesPresent = numerosAssociesFiltres.some(numero => numerosGagnants.slice(0, 3).includes(numero));

    return numeroBasePresent && numerosAssociesPresent;
}

// Fonction pour vérifier les gagnants pour BASETU4
function verifierGagnantsBASETU4(numeroBase, numerosAssocies, numerosGagnants) {
    const numeroBasePresent = numerosGagnants.slice(0, 4).includes(numeroBase);
    const numerosAssociesFiltres = numerosAssocies.filter(numero => numero !== numeroBase);
    const numerosAssociesPresent = numerosAssociesFiltres.some(numero => numerosGagnants.slice(0, 4).includes(numero));

    return numeroBasePresent && numerosAssociesPresent;
}

// Fonction pour afficher les résultats des gagnants
export function afficherResultatsGagnants(ticket, numerosGagnants , tirage , numeroBase ) {
    console.log("Résultats des Gagnants :");
    
                 let resultat = ''


        const gagnantNA1POTO = verifierGagnantsNA1POTO(ticket, numerosGagnants);
        const gagnantNAP1SIMPLE = verifierGagnantsNAP1SIMPLE(ticket, numerosGagnants);
        const gagnantNAP2SIMPLE = verifierGagnantsNAP2SIMPLE(ticket, numerosGagnants);
        const gagnantNAP2TU2 = verifierGagnantsNAP2TU2(ticket, numerosGagnants);
        const gagnantNAP2TU3 = verifierGagnantsNAP2TU3(ticket, numerosGagnants);
        const gagnantNAP2TU4 = verifierGagnantsNAP2TU4(ticket, numerosGagnants);
        const gagnantNAP3 = verifierGagnantsNAP3(ticket, numerosGagnants);
        const gagnantNAP4 = verifierGagnantsNAP4(ticket, numerosGagnants);
        const gagnantNAP5 = verifierGagnantsNAP5(ticket, numerosGagnants);
        const gagnantBASESIMPLE = verifierGagnantsBASESIMPLE(numeroBase , ticket , numerosGagnants);


        const gagnantBASETU2 = verifierGagnantsBASETU2(numeroBase , ticket , numerosGagnants)
        const gagnantBASETU3 = verifierGagnantsBASETU3(numeroBase , ticket , numerosGagnants);
        const gagnantBASETU4 = verifierGagnantsBASETU4(numeroBase , ticket , numerosGagnants)
       


         switch (tirage) {
            case "NA1POTO":
                console.log("NA1POTO : " + (gagnantNA1POTO ? "Gagné" : "Perdu"));
                resultat =  gagnantNA1POTO ? "Gagné" : "Perdu"
                 
                break;
            case "NAP1SIMPLE":
                console.log("NAP1SIMPLE : " + (gagnantNAP1SIMPLE ? "Gagné" : "Perdu"));
                resultat = gagnantNAP1SIMPLE ? "Gagné" : "Perdu"
                break;
                 case "NAP2SIMPLE":
                console.log("NAP2SIMPLE : " + (gagnantNAP2SIMPLE ? "Gagné" : "Perdu"));
                resultat = gagnantNAP2SIMPLE ? "Gagné" : "Perdu"
                break;
            case "NAP2TU2":
                  console.log("NAP2TU2 : " + (gagnantNAP2TU2 ? "Gagné" : "Perdu"));
                 resultat = gagnantNAP2TU2 ? "Gagné" : "Perdu"

                break
            case "NAP2TU3":
             console.log("NAP2TU3 : " + (gagnantNAP2TU3 ? "Gagné" : "Perdu"));
                  resultat = gagnantNAP2TU3 ? "Gagné" : "Perdu"

          break
            case "NAP2TU4":
        console.log("NAP2TU4 : " + (gagnantNAP2TU4 ? "Gagné" : "Perdu"));
                 resultat = gagnantNAP2TU4 ? "Gagné" : "Perdu"

         break
            case "NAP3":
        console.log("NAP3 : " + (gagnantNAP3 ? "Gagné" : "Perdu"));
         resultat = gagnantNAP3 ? "Gagné" : "Perdu"

        break
            case "NAP4":
        console.log("NAP4 : " + (gagnantNAP4 ? "Gagné" : "Perdu"));
         resultat = gagnantNAP4 ? "Gagné" : "Perdu"

              break
            case "NAP5":
               console.log("NAP5 : " + (gagnantNAP5 ? "Gagné" : "Perdu"));
             resultat = gagnantNAP5 ? "Gagné" : "Perdu"

               break
          case "BASESIMPLE":
        console.log("BASESIMPLE : " + (gagnantBASESIMPLE ? "Gagné" : "Perdu"));
               console.log(gagnantBASESIMPLE)
              resultat = gagnantBASESIMPLE ? "Gagné" : "Perdu"

                break
          case "BASETU2":
           console.log("BASETU2 : " + (gagnantBASETU2 ? "Gagné" : "Perdu"));
              resultat = gagnantBASETU2 ? "Gagné" : "Perdu"

             break
          case "BASETU3":
             console.log("BASETU3 : " + (gagnantBASETU3 ? "Gagné" : "Perdu"));
            resultat = gagnantBASETU3 ? "Gagné" : "Perdu"

             break
         case "BASETU4":
        console.log("BASETU4 : " + (gagnantBASETU4 ? "Gagné" : "Perdu"));
        resultat = gagnantBASETU4 ? "Gagné" : "Perdu"

             break
            default:
                console.log("Type de tirage non reconnu");
        resultat = "Type de tirage non reconnu"
        }

        console.log("------------");
        console.log('Résultat',resultat)
     return resultat

    ;

}

