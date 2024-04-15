import { Box, Button, Container, TextField } from '@mui/material';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';

function PublishInfo(props) {
    const infosRef = ref(db, 'information')
    const [details , setDetails] = useState('')

    function publish(params) {
        const info = {
            details : details,
            date: new Date().toISOString()
        }
        set(infosRef , info)
    }
    return (
        <Container>
           <h1>Publier une information</h1> 
            <TextField
          id="outlined-multiline-static"
          label="Rédiger l'information"
          multiline
          rows={4}
          onChange={(e)=>{
            setDetails(e.target.value)
          }}
        />
        <Button color='primary' variant='outlined' onClick={publish}>Publier </Button>
        </Container>
    );
}

export default PublishInfo;