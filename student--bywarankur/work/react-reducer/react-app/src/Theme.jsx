import React, { useEffect, useContext } from 'react';
import Context from './context/Context';

const Theme = () => {
  const context = useContext(Context);

  useEffect(() => {
    context.getTheme(context.username);

  }, []);

  const changeTheme = (e) => {
    let themeVal = e.target.value;
    context.setTheme(context.username, themeVal);
  };
  return (
  
    <select className="theme" value={context.theme} onChange={changeTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="highlight">Highlight</option>
    </select>
  
  );
};

export default Theme;