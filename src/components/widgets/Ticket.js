import React from 'react';
import { afficherResultatsGagnants } from '../../functions/verifiyTicketGagnant';
import { Diversity3 } from '@mui/icons-material';

function TicketDetails({ tirage, formule, numerosChoisis, miseDeBase, prixAPayer, gainPotentiel, gainPotentielDoubleChance, numeroBase, numerosAssocies, dateHeureEnregistrement, doubleChance , status }) {

    return (
        <div style={{padding: 5}}>
            <p>Date et heure d'enregistrement: {dateHeureEnregistrement}</p>
            <p>Tirage: {tirage}</p>
            <p>Formule: {formule}</p>

            {formule === 'BASESIMPLE' || formule === 'BASETU2' || formule === 'BASETU3' || formule === 'BASETU4' ? (
                <>
                    <p>Numéro de base: {numeroBase}</p>
                    <p>Numéros associés: {numerosAssocies.join(', ')}</p>
                </>
            ) : (
                <p>Numéros choisis: {numerosChoisis.join(', ')}</p>
            )}

            <p>Mise de base: {miseDeBase.toFixed(2)}</p>
            <p>Prix à payer: {prixAPayer.toFixed(2)}</p>

            {doubleChance ? (
                <>
                    <p>Gain potentiel haut: {(gainPotentielDoubleChance * 0.6).toFixed(2)}</p>
                    <p>Gain potentiel bas: {(gainPotentielDoubleChance * 0.4).toFixed(2)}</p>
                </>
            ) : (
                <p>Gain potentiel: {gainPotentiel.toFixed(2)}</p>
            )}
            
            <div>Statut du ticket: {status!=='En attente'  ? <div>
                {status==='Perdu'&&(<span style={{color: 'red'}}>{status}</span>)}
               {status==='Gagné'&&(<span style={{color: 'green'}}>
                {status}
               </span>)}

            </div>:<div>
                {status}
                </div>}
            </div>

            {/* Ajoutez d'autres détails du ticket ici */}
        </div>
    );
}

export default TicketDetails;
