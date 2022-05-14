import React, { useContext } from 'react';

import Context from './context/Context';

const ItemPage = () => {
  const context = useContext(Context);

  const logout = () => {
    context.setLogout();
  };

  return (
    <div>
      <div className="item-header"><b>ITEM-TRACKER</b></div>
      <div className="error-msg">{context.networkError}</div>
      <ul className="item">
        {context.isLoggedIn && (
          <button className="logout action" onClick={logout}>
            <b>Logout</b>
          </button>
        )}
      </ul>
    </div>
  );
};

export default ItemPage;