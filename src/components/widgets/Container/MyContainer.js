import React from 'react';
import Container from '@mui/material/Container';


function CenteredContentPage({content}) {
  const styles = {
    root: {
       display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
    }
  };

  return (
    <div style={styles.root}>
      <Container maxWidth="md">
       {content}
      </Container>
    </div>
  );
}

export default CenteredContentPage;
