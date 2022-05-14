import React, {useEffect, useState} from 'react';
import Top from './assets/Top';
import ErrMsg from './assets/ErrMsg';
import UpdateSlot from './assets/UpdateSlot';
import SlotInformation from './assets/SlotInformation';
import NewSlotBooking from './assets/NewSlotBooking';
import HomePage from './assets/HomePage';
import Login from './assets/Login';
import Signingup from './assets/Signingup';
import {fetchLoginStatus, fetchSlotList} from './services/fetchfunctions';
import './App.css';

function App() {
  const [err, setErrorState] = useState('');
  const [users, setUsers] = useState({});
  const [slot, setSlotState] = useState('');
  const [action, setUserAction] = useState({ isLoggedIn: false});
  const [page, setPageState] = useState('loginPage');
  
  useEffect(() => {
    fetchLoginStatus()
    .then(userDetails => {
      fetchSlotList(userDetails.username)
      .then((slots) =>{
        setErrorState('');
        setUserAction({
          isLoggedIn: true,
          username: userDetails.username,
          createdSlots: slots.createdSlots,
          bookedSlots: slots.bookedSlots
        });
        setPageState('homePage');
      })
      .catch((err) => {
        setErrorState(err.code);
      });
    })
  }, []);


  const login = (username, createdSlots, bookedSlots, err) => {
    setErrorState(err);
    if(!err) {
      setUserAction({
        isLoggedIn: true,
        username,
        createdSlots,
        bookedSlots
      });
      setPageState('homePage');
    }
  };

  const signingup = () => {
    setErrorState('');
    setUserAction({
      ...action,
      isLoggedIn: false
    });
    setPageState('signingupPage');
  };

  const logoutPage = (err) => {
    setErrorState(err);
    setUserAction({
      ...action,
      isLoggedIn: false
    });
    setPageState('loginPage');
  };

  const createdSlotPage = (validUsers, err) => {
    setErrorState(err);
    if(!err) {
      setUsers(validUsers);
      setPageState('createdSlot');
    }
  }

  const slotDetailsPage = (slot, err) => {
    setErrorState(err);
    if(!err) {
      setSlotState(slot);
      setPageState('slotDetails');
    }
  }

  const loginPage = (err) => {
    setErrorState(err);
    if(!err) {
      setPageState('loginPage');
    }
  }

  const updateSlots = (createdSlots, bookedSlots, err) => {
    setErrorState(err);
    if(!err) {
      
      setUserAction({
        ...action,
        createdSlots: createdSlots,
        bookedSlots: bookedSlots
      });
    }
  };

  const homePage = (createdSlots, bookedSlots, err) => {
    setErrorState(err);
    if(!err) {
      setUserAction({
        ...action,
        createdSlots,
        bookedSlots
      });
      setPageState('homePage');
    }
  };

  const getUpadtedSlotPage = (slot, validUsers, err) => {
    setErrorState(err);
    if(!err) {
      setSlotState(slot);
      setUsers(validUsers);
      setPageState('updateMeetupPage');
    }
  }

  let container;

  if(page === 'signingupPage') {
    container = <Signingup isRegistered={loginPage}/>;
  }
  else if(page === 'loginPage') {
    container = <Login onLogin={login} isRegistered={signingup}/>;
  }
  else if(page === 'homePage') {
    container = <HomePage 
                state={action}
                onCreate={createdSlotPage}
                onUpdate={updateSlots}
                onLogout={logoutPage}
                onDetails={slotDetailsPage}
                onSlotUpdate={getUpadtedSlotPage} />          
  }
  else if(page === 'createdSlot') {
    container = <NewSlotBooking state={action} users={users} onDetails={slotDetailsPage} onHomePage={homePage}/>
  }
  else if(page === 'slotDetails') {
    container = <SlotInformation state={action} slot={slot} onHomePage={homePage}/>
  }
  else if(page === 'updateMeetupPage') {
    container = <UpdateSlot state={action} slot={slot} users={users} onHomePage={homePage} onDetails={slotDetailsPage}/>
  }

  return (
    <div className="App">
      <div className="header">
        <Top/>
      </div>
   

      <div className="err-msg">
        <ErrMsg err={err}/>
      </div>

      <div className="container">
        {container}
      </div>

      <div className="footer">
        <span>© slotbookingsystem</span>  
      </div>
    </div>
  );
}

export default App;
