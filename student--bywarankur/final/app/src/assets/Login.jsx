import React, { useState } from 'react';
import { fetchLogin, fetchSlotList } from '../services/fetchfunctions';

const Login = ({onLogin,isRegistered}) => {

    const [username, setUserSate] = useState('');

    const implementLogin = () => {
       
      if(!username) {
			onLogin('', {}, {}, 'USERNAME_MANDATORY');
			return;
		}
		fetchLogin(username)
		.then((details) => {
			setUserSate('');
			fetchSlotList(details.username)
			.then((slot) => {
				onLogin(details.username, slot.createdSlots, slot.bookedSlots, '');
			})
			.catch((err) => {
				onLogin('', {}, {}, err.code );
			});
		})
		.catch( (err) => {
			setUserSate('');
			onLogin('', {}, {}, err.code );
		});
    };

    const register = (e) => {

        e.preventDefault();
		isRegistered();
    };

    return(
      <div className="register">
      <a
        className="register-account"
        href="https://slot.com"
        title="Click for Slot Detail"
        onClick={(e) => register(e)}
      >
      New User?Create Account!!
      </a> 
        <div className="login-container">
        <label for="uname"><b>Username</b></label> 
            <input className="login-username" value={username} placeholder="" onChange={(e) => setUserSate(e.target.value)}/>
            <button className="login-btn" onClick={ implementLogin }>Login</button>
     
            </div>

        </div>
    );

};

export default Login;