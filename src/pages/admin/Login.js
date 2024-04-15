import { Alert, Box, Button, Snackbar, TextField, Typography, colors } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import MyContext from './../../contextes/globalState';
import { auth } from '../../firebaseConfig/firebaseConfig';
import { getUrlSegment } from '../../functions/getUrlSegment';



function AdminConnexion(props) {
    const navigate = useNavigate()
    const [email , setEmail] = useState('')
      const [password , setPassWord] = useState('')
      const [open , setOpen ] = useState(false)
      const [error , setError] = useState(false)
      const {globalState , setGlobalState }= useContext(MyContext)

const handleClose = ()=>{
  setOpen(false)
}
useEffect(()=>{
        console.log(getUrlSegment(1))

},[])
    const login = ()=>{
      if(email==='jeremieakohou@gmail.com'){
         signInWithEmailAndPassword(auth , email , password).then((user)=>{
         navigate(`/admin/`)
      }).catch((err)=>{
        navigate(``)
        console.log(err)
        setError(true)
        setOpen(true)
      })
      }
    }
    return (
        <Box>
            <Typography variant='div' component={'h1'} sx={{textAlign:'center'}}>
                Se connecter en tant qu'administrateur
            </Typography>
            <br /><br/>
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
           <TextField id="outlined-basic" label="Adresse email" variant="outlined" 
           type='email'
           onChange={(e)=>{
            setEmail(e.target.value)
           }}
           value={email}
           />
           </Box>
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
           <TextField id="outlined-basic" label="Votre mot de passe" variant="outlined" 
           value={password}
           onChange={(e)=>{setPassWord(e.target.value)}}
           type='password'
           />
           </Box> 
        

             <br /><br/>
           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color='primary' sx={{ flex: 1, marginRight: '0.5rem'}}  variant='contained'
           onClick={()=>{
            login()
           }}
          >
            Continuer
          </Button>
          <Button sx={{ flex: 1, marginLeft: '0.5rem' }} color='primary' variant='outlined'
            onClick={()=>{navigate('/')}}
          >
            Annuler
          </Button>

        </Box>
        <Typography variant="body2" sx={{display:'flex'}} mt={4}>
          Vous n'avez pas un compte administrateur ?
            <NavLink
             
              to="/admin/sign-up"
              underline="hover"
              sx={{ color: colors.blueGrey, ':hover': { color: 'indigo.500' } , ml:2}}
             
            >
            Créer un compte
            </NavLink>
          </Typography>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
    Connexion échouée. Veillez réessayer
  </Alert>
</Snackbar>
           </Box>
    );
}

export default AdminConnexion;