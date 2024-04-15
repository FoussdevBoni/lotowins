import { Announcement, ChatBubble, Check, CheckBox, CheckBoxSharp, Description, Help, Home, Input, Menu, Money, Output, Person, PersonAdd, TrendingUp } from "@mui/icons-material";
import {  Alert, Paper } from "@mui/material";

export const adminMenuItems = [
  { icon: <Home />, text: 'Tableau de bord' , route: '/admin' },
  { icon: <Description />, text: 'Tous les tickets' , route: '/admin/tous-les-tickets' },
  { icon: <Output />, text: 'Les retraits' , route: '/admin/retraits' },
    { icon: <Input />, text: 'Les dépots' , route: '/admin/depots' },
  { icon: <ChatBubble />, text: 'Les reclamations' , route: '/admin/reclamations'},
  { icon: <TrendingUp />, text: "L'évolution de la plateforme" , route: '/admin/evolution-plateforme' },
   { icon: <Alert />, text: "Publier une information" , route: '/admin/publier-une-information' },
];




export const userMenuItems = [
  { icon: <Home />, text: 'Tableau de bord' , route: '/mon-dashboard' },
  { icon: <Description />, text: 'Tous mes tickets' , route: '/mes-tickets' },
  { icon: <Output />, text: 'Mes retraits' , route: '/mes-retraits' },
    { icon: <Input />, text: 'Mes dépots' , route: '/mes-depots' },
        { icon: <CheckBoxSharp />, text: 'Validations' , route: '/validations' },

  { icon: <ChatBubble />, text: 'Faire une reclamation' , route: '/reclamations'},


  {icon: <Money/> , text: 'Recharger mon compte' , route: '/recharger-mon-compte'},

];