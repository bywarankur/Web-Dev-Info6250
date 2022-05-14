import React, { useContext } from 'react';
import Context from './context/Context';


const Filter = () => {
  const context = useContext(Context);

  const filterTasksByStatus = (e) => {
    context.filterTasksByStatus(e.target.value);
  };

};

export default Filter;