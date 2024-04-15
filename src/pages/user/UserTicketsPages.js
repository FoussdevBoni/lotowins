import { Box, Card, Grid } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import TicketDetails from '../../components/widgets/Ticket';
import {afficherResultatsGagnants} from '../../functions/verifiyTicketGagnant'
import formaterDateISO8601 from '../../functions/formatDate';

function UserTicketsPages({ user , ticket }) {
   
    return (
      
                 <Card key={ticket.id} sx={{padding: 10}}>
                    <TicketDetails
                        tirage={ticket.tirage}
                        formule={ticket.formule}
                        numerosChoisis={ticket.numerosChoisis}
                        miseDeBase={ticket.miseDeBase}
                        prixAPayer={ticket.prixAPayer}
                        gainPotentiel={ticket.gainPotentiel}
                        gainPotentielDoubleChance={ticket.gainPotentielDoubleChance}
                        numeroBase={ticket.numeroBase}
                        numerosAssocies={ticket.numerosAssocies}
                        dateHeureEnregistrement={formaterDateISO8601(ticket.dateHeureEnregistrement)}
                        doubleChance={ticket.doubleChance}
                        status = {ticket.status}
                    />
                </Card>
           
    );
}

export default UserTicketsPages;
