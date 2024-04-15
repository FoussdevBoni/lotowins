import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { db } from '../../firebaseConfig/firebaseConfig';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { onValue, ref, set , get , push} from 'firebase/database';
function MesRetraits({user}) {
    const  [amount, setAmount] = useState(0)
    const [accountInfos, setAccountInfos] = useState('')
    const [payWay , setPayWay] =useState('')

   const  newRetrait = ()=>{
       const retraitsRef = ref(db, 'retraits')
       const retrait = {
          amount : amount , 
          user: user , 
          accountInfos: accountInfos, 
          payWay: payWay , 
          date: new Date().toISOString(), 
          status: 'En attente', 

       }

       if (user.soldeGain>= amount) {

         push(retraitsRef , retrait).then(()=>{
            alert('Votre retrait a été effectué avec succès')
            
            const userRef = ref(db, 'users/'+user.id+'/soldeGain')
            set(userRef , parseFloat(user.soldeGain) - parseFloat(amount))
         })

       }else{
         alert('Votre solde est insuffisant')
       }
 

 
    }

    const [retraits , setRetraits] = React.useState([])

  React.useEffect(()=>{
    const dataRef = ref(db, 'retraits')
    onValue(dataRef , (snapshot)=>{
      const data = snapshot.val()
      if (data) {
        const usersData = Object.entries(data).map(([key , value])=>(
          {
            ...value,
            id: key
          }
        ))
        setRetraits(usersData)
        console.log(usersData)
      }
    })


  }, [])


  retraits.reverse()
    return (
        <Box flex={1} marginTop={14}>
             <Container>
              <Grid container>
            <Grid xs={12} sm={12} md={3} item>
               <Autocomplete
               disablePortal
              id="combo-box-demo"
              options={
                [
                    'Moyen mobile', 
                    'Carte prepaid', 
                    'T-money'
                ]
              }
              renderInput={(params) => <TextField {...params} label="Les moyens de payement" />}

              placeholder="Choisir un moyen de payement"
              onChange={ (event, newValue) => {
                setPayWay(newValue)

              }}

                 
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'80%' }}
              />
            </Grid>
            <Grid xs={12} sm={12} md={3} item>
            <TextField
                id="filter"
                value={amount}
                type='number'
                placeholder="Saisir le montant à retirer"
                 onChange={(e)=>{
                   
                   if (e.target.value<=100000) {
                      setAmount(e.target.value)
                   }else {
                       setAmount(100000)

                   }
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'80%' }}
             />
           </Grid>
             
            <Grid xs={12} sm={12} md={3} item>
            <TextField
                id="filter"
                value={accountInfos}
                placeholder="Saisir les identifiants de payement"
                 onChange={(e)=>{
                   setAccountInfos(e.target.value)
                 }}
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, backgroundColor: 'white' , width:'80%' }}
             />
           </Grid>

            <Grid xs={12} sm={12} md={3} item>
              <Button color='primary' variant='contained' 
                disabled = {amount===''||parseFloat(amount)<0||accountInfos===0||payWay===''}
              onClick={()=>{
                if (amount>0) {
                  newRetrait()
                }else {
                  alert('Veillez saisir une valeur valide ')
                }
              }}>
                  Lancer le retrait
             </Button>
        </Grid>
        </Grid> 
             </Container>



            <Typography sx={{textAlign: 'center' , marginTop: 4}}>
          Tous les Retraits
       </Typography>
       
            
          
            
           <br></br>  
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: window.innerWidth+100 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
             <TableCell align="right">Montant</TableCell>
            <TableCell align="right">Moyen de payement</TableCell>
          <TableCell align="right">Infos du compte</TableCell>
            <TableCell align="right">Statut</TableCell>
            <TableCell align="right">La date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {retraits.map((retrait, index) =>{
                       
            if (retrait.user.id===user.id) {
                return  (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {retraits.length - index}
              </TableCell>
              <TableCell align="right">
                 {retrait.amount}
              </TableCell>
                  <TableCell align="right">
                 {retrait.payWay}
              </TableCell>
               <TableCell align="right">
                 {retrait.accountInfos}
               </TableCell>
                <TableCell align="right">
                  {retrait.status}
              </TableCell>
              <TableCell align="right">
                  {retrait.date}
              </TableCell>
            </TableRow>
          )
            }else {
              return null
            }
              
          })}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    );
}

export default MesRetraits;