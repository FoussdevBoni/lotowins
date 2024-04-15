import { Box, Card, Grid } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import TicketDetails from '../../components/widgets/Ticket';
import {afficherResultatsGagnants} from '../../functions/verifiyTicketGagnant'

function UserTicketsPages({ user }) {
    const [tickets, setTickets] = useState([]);
   function getTickets(){

            if (user!==undefined) {
                 const ticketsRef = ref(db, 'tickets/allTickets');

                 onValue(ticketsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ticketsData = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                setTickets(ticketsData);
            }
        });
 }
   }
    useEffect(() => {
       getTickets()
    }, []);

    return (
        <Grid container spacing={2} padding={3}>
            <h2>Les tickets</h2>
            {tickets.map((ticket) => {
            
               if (ticket.user.id===user.id) {
                 return (
                      <Grid  key={ticket.id+'grid'} item xs={12} md={12}>
                 <Card key={ticket.id}>
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
                        dateHeureEnregistrement={ticket.dateHeureEnregistrement}
                        doubleChance={ticket.doubleChance}
                        status = {ticket.status}
                    />
                </Card>
               </Grid>
            )
            }else{

                  return null

               }
            })}
        </Grid>
    );
}

export default UserTicketsPages;
