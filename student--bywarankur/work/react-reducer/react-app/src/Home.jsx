import React, { useContext, useEffect } from 'react';
import Context from './context/Context';
import Theme from './Theme';
import Items from './Items';
import Login from './Login';

const Home = () => {
  const context = useContext(Context);

  useEffect(
    () => {
      context.getLoginStatus();
    },

    []
  );

  let content;

  if (context.isLoggedIn) {
    content = (
      <>
        <div className="second-header">
          What item you want to add today {context.username.toUpperCase()} ?
          <Theme />
        </div>
        <p className="error-msg">{context.error}</p>

        <Items />
      </>
    );
  } else {
    content = <Login />;
  }

  return <div>{content}</div>;
};

export default Home;