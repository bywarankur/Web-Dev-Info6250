import React, { useState, useContext } from 'react';
import spinner from './spinner.svg';
import Context from './context/Context';
const Login = () => {
  const context = useContext(Context);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = () => {
    setIsLoading(true);
    context.setLoginStatus(username);
    setIsLoading(false);
  };

  return (
    <div className="login">
      <input
        className="user-info"
        placeholder="Enter User-name"
        onChange={(e) => setUsername(e.target.value)}
      />
      {isLoading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button className="login-btn" onClick={performLogin}>
          <b>Login</b>
        </button>
      )}
    </div>
  );
};

export default Login;