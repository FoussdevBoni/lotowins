import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { jouerLoto } from './fonctions/jouerLoto';
import { useNavigate } from 'react-router-dom';

const PariForm = ({user}) => {
  const [formData, setFormData] = useState({
    tirage: '',
    formule: '',
    numeroBase: '',
    numerosAssocies: '',
    numerosChoisis: '',
    miseDeBase: 0,
  });
 const [submitting , setSubmitting ]= useState(false)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
const navigate = useNavigate()

  const handleSubmit = () => {
      if (formData.miseDeBase<10) {
              alert('La mise de base doit être au moins 10F')

      } else if(formData.numerosAssocies===''&&formData.numerosChoisis===''){
         alert('Veillez choisir les numéros')

      } else if ((formData.formule === 'BASESIMPLE' || formData.formule === 'BASETU2' || formData.formule === 'BASETU3' || formData.formule === 'BASETU4')&&(formData.numerosAssocies===''||formData.numeroBase==='')){
                     alert('Vous devrez renseigner le numéro de base et choisir des numéros associés à cette dernière')

      } else if (!(formData.formule === 'BASESIMPLE' || formData.formule === 'BASETU2' || formData.formule === 'BASETU3' || formData.formule === 'BASETU4')&&formData.numerosChoisis===''){
         alert('Vous devrez  choisir des numéros  ')

      } 
      
      
      else{

       setSubmitting(true)
       jouerLoto(formData , user , navigate )?.then(()=>{
          setSubmitting(false)
       }).catch(()=>{
         setSubmitting(false)
       })
      }
    
  };

  return (
    <Container maxWidth="sm" className="mt-6">
      <Typography variant="h2" align="center" mb={2} fontSize={23}>
        Commencer par parier
      </Typography> <br/>
      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel id="tirage-label">Sélectionnez le tirage:</InputLabel>
        <Select
          labelId="tirage-label"
          id="tirage"
          value={formData.tirage}
          label="Sélectionnez le tirage"
          onChange={(e)=>{
             setFormData((prevData) => ({
             ...prevData,
            'tirage': e.target.value,
    })) 
          }}
        >
            
        
      
       
       
          <MenuItem value="B11h">B11h(9h53)</MenuItem>
          <MenuItem value="B14h">B14h(12h53)</MenuItem>
          <MenuItem value="B18h">B18h(16h53)</MenuItem>
          <MenuItem value="C7h">C7h(6h50)</MenuItem>
          <MenuItem value="C10h">C10h(9h55)</MenuItem>
          <MenuItem value="C13h">C13h(12h:55)</MenuItem>
          <MenuItem value="C16h">C16h(15h55)</MenuItem>
          <MenuItem value="C21h">C21h(20h55)</MenuItem>
          <MenuItem value="C23h">C23h(22h55)</MenuItem>
          <MenuItem value="T14h">T14h(12h55)</MenuItem>
          <MenuItem value="T19h">T19h(17h55)</MenuItem>
        </Select>
      </FormControl>
        <br />

      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel id="formule-label">Sélectionnez une formule de jeu:</InputLabel>
        <Select
          labelId="formule-label"
          id="formule"
          value={formData.formule}
          label="Sélectionnez une formule de jeu"
         onChange={(e)=>{
             setFormData((prevData) => ({
             ...prevData,
             'formule': e.target.value,
          })) 
          }}        >
          <MenuItem value="NA1POTO">NA1POTO</MenuItem>
          <MenuItem value="NAP1SIMPLE">NAP1SIMPLE</MenuItem>
          <MenuItem value="NAP2SIMPLE">NAP2SIMPLE/PERM</MenuItem>
          <MenuItem value="NAP2TU2">NAP2TU2</MenuItem>
          <MenuItem value="NAP2TU3">NAP2TU3</MenuItem>
          <MenuItem value="NAP2TU4">NAP2TU4</MenuItem>
          <MenuItem value="NAP3">NAP3</MenuItem>
          <MenuItem value="NAP4">NAP4</MenuItem>
          <MenuItem value="NAP5">NAP5</MenuItem>
          <MenuItem value="BASESIMPLE">BASESIMPLE</MenuItem>
          <MenuItem value="BASETU2">BASETU2</MenuItem>
          <MenuItem value="BASETU3">BASETU3</MenuItem>
          <MenuItem value="BASETU4">BASETU4</MenuItem>
        </Select>
      </FormControl>
              <br />

      <div id="numerosBaseAssociesDiv" className="form-group">
        
        <TextField
          fullWidth
          id="numeroBase"
          label="Numéro de base"
          type="number"
          required
          onChange={handleChange}
        />
        <br />
                      <br />

        <TextField
          fullWidth
          id="numerosAssocies"
          label="Numéros associés (séparés par des virgules)"
          onChange={handleChange}

        />
      </div>
         <br/>
      <TextField
        fullWidth
        id="numerosChoisis"
        label="Saisissez les numéros choisis (séparés par des virgules)"
        onChange={handleChange}
      />
              <br />
                      <br />

      <TextField
        fullWidth
        id="miseDeBase"
        label="Saisissez la mise de base (10F au minimun)"
        type="number"
        step="0.01"
        required
        onChange={handleChange}
      />
              <br />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} className="mt-3" disabled={submitting}>
        Valider le ticket
      </Button>
    </Container>
  );
};

export default PariForm;
