import React, { useContext } from 'react';

import ItemPage from './ItemPage';
import Home from './Home';
import './App.css';
import Context from './context/Context';

const App = () => {
  const context = useContext(Context);

  return (
    <>
      <div className={`app ${context.theme ? context.theme : ''}`}>
        <ItemPage />
        <Home />
      </div>
    </>
  );
};

export default App;