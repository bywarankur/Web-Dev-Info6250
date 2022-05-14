import React, { useState} from 'react';
import { fetchSigningupPage } from '../services/fetchfunctions';

const Signingup = ({isRegistered}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    
    const implementSigningup = () => {

        if(!firstName) {
			isRegistered('FIRSTNAME_MANDATORY');
			return;
		}
		if(!lastName) {
			isRegistered('LASTNAME_MANDATORY');
			return;
		}
		fetchSigningupPage( firstName.concat(lastName))
		.then( () => {
			setFirstName('');
			setLastName('');
			isRegistered('');
		})
		.catch((err) => {
			setFirstName('');
			setLastName('');
			isRegistered(err.code);
		});
    };

    const getLogin = (e) => {
        e.preventDefault();
        isRegistered('');
    };

    return(
        <div className="register">
        <a
          className="to-login"
          href="https://slotlogin.com"
          title="Click to Login if already Signed-In"
          onClick={(e) => getLogin(e)}
        >
         If already registered !! Redirect to login page!!!!
        </a>
        <div className="signingup">

        
            <label className="uname" for="uname"><b>Register with first and last name:</b></label> 
            <input className="first-name" value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
            <input className="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <button className="register-button" onClick={implementSigningup}> Register Here </button>
       
            </div>
        </div>
    );
};

export default Signingup;