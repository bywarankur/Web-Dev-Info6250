import React from 'react';
import { fetchSlotList, fetchValidUsers  } from '../services/fetchfunctions';

import DeleteProfile from './DeleteProfile';
import CreateSlotBtn  from './CreateSlotBtn';
import CreatedSlot from './CreatedSlot';
import ReservedSlot from './ReservedSlot';
import Logout from './Logout';




const HomePage = ({
    state,
    onCreate,
    onUpdate,
    onDetails,
    onSlotUpdate,
    onLogout,
 
}) => {

    // const createdSlot = () => {
    //     fetchValidUsers()
    //     .then((user) => {
    //         onCreate(user, '');
    //     })
    //     .catch((err) => {
    //         onCreate({}, err.code);
    //     });  
    // };

    const slotList = () => {
        
        fetchSlotList(state.username)
        .then((slot) => {
            
            onUpdate(slot.createdSlots, slot.bookedSlots, '');   
        })
        .catch((err) => {
            onUpdate([], [], err.code);
        });
    }

    const createdSlot = () => {
        fetchValidUsers()
        .then((user) => {
            onCreate(user, '');
        })
        .catch((err) => {
            onCreate({}, err.code);
        });  
    };
    return (
        <div className="user-home-container">
            <div className="navigation-button">
            
                <CreateSlotBtn onCreateSlot={createdSlot}/>
          
                <Logout state={state} onUserLogout={onLogout}/>
            </div>
            <div className="slot-detail-panel">
            <div className="created-slot">
                <CreatedSlot state={state} details={onDetails} update={onUpdate} slotUpdate={onSlotUpdate}/>
            </div>
            <div className="reserved-slot">
                <ReservedSlot state={state} details={onDetails} update={onUpdate}/>
            </div>
            </div>

        </div>
    );

}


export default HomePage;