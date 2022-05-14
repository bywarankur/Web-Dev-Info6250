import React from 'react';

import {fetchLogout} from '../services/fetchfunctions';

const Logout = ({ state, onUserLogout }) => {
	

	const userLogout = () => {
		
		fetchLogout()
		.then(() => {
			onUserLogout('');
		})
		.catch((err) => {
			onUserLogout(err.code);
		});
	};

	return (
			 state.isLoggedIn &&
            <button className="logout-btn" 
            title="Click to Logout" 
            onClick={ userLogout }>Logout
            </button> 
    );
};

export default Logout;