export function contientElementsDifferents(tableau) {
  if (tableau) {
     // Utilisation d'un ensemble pour vérifier les éléments uniques
    let elementsUniques = new Set(tableau);
    
    // Si la taille de l'ensemble est égale à la taille du tableau, tous les éléments sont différents
    if (elementsUniques?.size === tableau.length) {
        return true;
    } else {
        return false;
    }
  }
}