import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Person, Phone, Room } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({user}) {
    const navigate = useNavigate()
  return (
    <List sx={{ width: window.innerWidth, bgcolor: 'background.paper', marginTop: 15 }}>
        <h1 style={{textAlign: 'center'}}>Mon profil</h1>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nom d'utilisateur" secondary={user.username}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary=
        {user.email} />
      </ListItem>
       <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Phone />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Numéro de téléphone" secondary= {user.phone} />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Room />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pays" secondary= {user.country} />
      </ListItem>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Room />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Age" secondary= {user.age} />
      </ListItem>
       <ListItem>
        <Button color='primary' variant='outlined' onClick={()=>{
            navigate('/modifier-profile')
        }}>
            Modifier mon compte
        </Button>
      </ListItem>
    </List>
  );
}