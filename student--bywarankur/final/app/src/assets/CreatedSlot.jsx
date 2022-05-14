import React from 'react';
import { fetchSlotForUser,
         fetchRemoveCreatedSlot,
         fetchSlotList,
         fetchValidUsers } from '../services/fetchfunctions';

const CreatedSlot = ({ state, details, update, slotUpdate }) => {
    

    const implementRemoveSlot = (e, slotId) => {
        e.preventDefault();
        fetchRemoveCreatedSlot(slotId)
        .then(() => {
            fetchSlotList(state.username)
            .then((slot) => {
                update(slot.createdSlots, slot.bookedSlots, '');
            })
            .catch((err) => {
                update([], [], err.code);
            });
        })
        .catch((err) => {
            update([], [], err.code);
        });
    };
    const getSlotDetails = (e, slotId) => {
        e.preventDefault();
        fetchSlotForUser(slotId)
        .then((slot) => {
            details(slot, '');
        })
        .catch((err) => {
            details({}, err.code);
        });
    };
    const implementUpdateSlot = (e, slot) => {
        e.preventDefault();
        fetchValidUsers()
        .then((user) => {
            slotUpdate(slot, user,'');
        })
        .catch((err) => {
            slotUpdate({}, {}, err.code);
        });
    };
    

    return (
        
        <div className="created-slot-container">
            <div className="slot-heading">
                <p>Booked Slots</p>
            </div>
            
            {(state.createdSlots.length === 0) ? 
            <p className="empty-slots">No Booked Slots found!Please create slot now!!</p>:
            <ul className="slots">
                

                {Object.values(state.createdSlots).map((slot, key) => (
                    <li key={key}>
                        <div className="li-slot">
                        
                            <div className="li-slot-name">
                                <a href="https://li-slot1.com" 
                                title="Click for Meetup Details" 
                                onClick={e => getSlotDetails(e, slot.slotId)} > 
                                {slot.title}
                                </a>
                            </div>

   

                            <div>
                                Date:{' '}
                                <span className="li-slot-date">{slot.date}</span>
                            </div>

                            <div>
                                Time:{' '}
                                <span className="li-slot-time">{slot.time}</span>
                            </div>

                            <div className="delete-meeting">
                                <button className="delete-meeting-button" onClick={e => implementRemoveSlot(e, slot.slotId)}>Remove Booked Slot</button>
                                <button className="update-meeting-button" onClick={e => implementUpdateSlot(e, slot)}>Update Booked Slot</button>
                            </div>  
                        </div>
                    </li>
                ))}
            </ul>
        }
        </div>
    );
};

export default CreatedSlot;