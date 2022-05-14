import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession, fetchLogin, fetchLogout } from './services';
import Nav from './Nav';
import Login from './Login';
import ShowStuff from './ShowStuff';
import TodoApp from './TodoApp';
// import Loading from './Loading';



function App() {
  // Top level state is passed down as props to descendents
  // Any changes are made via callbacks also passed as props
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: false });
  const [username, setUsername] = useState();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [status, setStatus] = useState(true);



  const login = () => {
    console.log("username : " + username);
    setIsPending(true);
    fetchLogin(username)
      .then(userinfo => {
        setIsPending(false);
        setisLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
        // setStatus(err.error);// TODO: convert to friendly message
        setIsPending(false);
      });
  };



  const logout = function () {
    // Inform UI to wait
    setUserState({
      ...userState,
      isPending: true,
    });

    // Begin logout
    endSession()
      .then(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      })
      .catch(() => {
        // TODO: notify user of issue
        setUserState({
          ...userState,
          isPending: false,
        });
      });
  };






  const onChange = (e) => {
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  return (
    <div className="app">



      {isLoggedIn && <TodoApp />
      }
      {!isLoggedIn &&

        <div>
          {status && <div class="status">{status}</div>}
          <label>
            Username:
            <input disabled={isPending} onChange={onChange} value={username} />
          </label>
          <button onClick={login} disabled={isDisabled || isPending} >{isPending ? "..." : "Login"}</button>
        </div>

      }


    </div>
  );
}

export default App;
