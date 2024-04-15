import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeaderCarousel from '../../components/sections/visitor/HeaderCarousel';
import Separator from '../../components/widgets/Separator';
import { db } from '../../firebaseConfig/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import formaterDateISO8601 from './../../functions/formatDate';

function Home(props) {
    const infosRef = ref(db, 'information')
    const [info , setInfo] = useState()
    useEffect(()=>{
      onValue(infosRef , (sn)=>{
        const data = sn.val()
        if (data) {
           setInfo(data) 
        }else{
            setInfo(null)
        }
      })
    },[infosRef])
    return (
        <Box>
            <HeaderCarousel />
            <Box>
              <br/><br/>
               <Separator title={' Information '} style={{fontSize: 25}}/>
                             <br/><br/>
               <Container>
                {
                  info&&(
                    <div>
                        <p>
                    {info.details}
                  </p>
                  <i>
                  Publié le   {formaterDateISO8601(info.date)}
                  </i>
                    </div>
                  )
                }
               </Container>
            </Box>
        </Box>
    );
}

export default Home;