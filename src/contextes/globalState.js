import React, { createContext } from 'react';

const MyContext = createContext();

export default MyContext;



export const MyProvider = (props) => {
    const [globalState, setGlobalState] = React.useState({
     gameSize: 2,
     gamers: []
  });
    return (
      <MyContext.Provider value={{ globalState, setGlobalState }}>
        {props.children}
      </MyContext.Provider>
    );
  };