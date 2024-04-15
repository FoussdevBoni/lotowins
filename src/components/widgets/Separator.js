import React from 'react';
import { Divider, Typography } from '@mui/material';

const Separator = ({ title, style }) => {
  const separatorContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const separatorStyle = {
    flexGrow: 1,
    borderColor: '#888',
    borderTopWidth: 2,
  };

  const titleStyle = {
    margin: '0 16px',
    fontWeight: 'bold',
    ...style,
  };

  return (
    <div style={separatorContainerStyle}>
      <Divider style={separatorStyle} />
      <Typography variant="h1" style={titleStyle}>
        {title}
      </Typography>
      <Divider style={separatorStyle} />
    </div>
  );
};

export default Separator;
