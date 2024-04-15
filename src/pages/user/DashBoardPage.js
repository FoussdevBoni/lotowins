import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PariForm from '../../components/sections/user/PariForm';

const DashBoardPage = ({user}) => {
  const [formData, setFormData] = useState({
    tirage: 'B11h',
    formule: 'NA1POTO',
    numeroBase: '',
    numerosAssocies: '',
    numerosChoisis: '',
    miseDeBase: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = () => {
    // Mettez ici la logique pour valider le ticket
  };

  return (
    <Box>
      
      {
        user && (
          <Container maxWidth="sm" sx={{mt: 18}}>
        <main>
          <section className="soldes-data">
            <div className="my-soldes">
              <Typography variant="h4" align="center">
                Bienvenu {user.username} !
              </Typography>
                <div class="card" style={{width: '18rem'}}>
              <div class="card-body">
               <h5 class="card-title">Gain</h5>
                {user.soldeGain ? user.soldeGain: 0 } F CFA
            </div>
          </div>
             <br/>
           <div class="card" style={{width: '18rem'}}>
              <div class="card-body">
               <h5 class="card-title">Jeu</h5>
                {user.soldeJeu ? user.soldeJeu: 0 } F CFA
           </div>

           </div>

            </div>
          </section>

          <section className="game-start mt-5">
            <PariForm user={user}/>
          </section>

         

          {/* Modal */}
          {/* Ajoutez la modal ici */}

        </main>
      </Container>
        )
      }
      <footer></footer>


      
    </Box>
  );
};

export default DashBoardPage;
