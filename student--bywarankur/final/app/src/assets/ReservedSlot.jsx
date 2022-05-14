import React, { useState } from 'react';
import { fetchSlotForUser, fetchUpdateFeedback, fetchRemoveReservedSlot, fetchSlotList } from '../services/fetchfunctions';


const ReservedSlot = ({state, details, update}) => {

    const [feedback, setFeedbackState] = useState('');
        



    const implementUpdateFeedback = (e, slotId) => {
        e.preventDefault();
        fetchSlotForUser(slotId)
        .then (() => {
            fetchSlotList(state.username)
            .then((slot) => {
                Object.values(slot.bookedSlots)
                .filter(meet => meet.meet.slotId === slotId)
                .map((meet) => (meet.isGoing = ''));
                update(slot.createdSlots, slot.bookedSlots, '');
            })
            .catch((err) => {
                update([], [], err.code);
            });
        })
        .catch ((err) => {
            update([], [], err.code);
        });
    };
    const slotDetails = (e, slotId) => {

        e.preventDefault();
		fetchSlotForUser(slotId)
		.then((slot) => {
			details(slot, '');
		})
		.catch((err) => {
			details({}, err.code);
		});
    };

    return (
        <div className="reserved-slot-container">
            <div className="slot-heading">
                <p>Reserved-Slots</p>
            </div>
            
            {(state.bookedSlots.length === 0) ?
                <p className="empty-slots">No reserved slots yet!!</p> :
                <ul className="slots">
                    {Object.values(state.bookedSlots).map( (invited,key) => (
                         
                        <li key={key}>
                            <div className="slot">
                                
                                <div>
                                    <a href="https://slot1.com" 
                                    title="Click for Slot Details" 
                                    onClick={(e) => slotDetails(e, invited.slot.slotId)}>{invited.slot.title}
                                    </a>
                                </div>

                                <div className="li-slot-host">
                                    Anchor-Person:{' '}
                                    <span>{invited.slot.host}</span>
                                </div>

                                <div className="li-slot-place">
                                    Vennue:{' '}
                                    <span>{invited.slot.place}</span>
                                </div>

                                <div className="li-slot-date">
                                    Date:{' '}
                                    <span>{invited.slot.date}</span>
                                </div>

                                <div className="li-slot-time">
                                    Time:{' '}
                                    <span>{invited.slot.time}</span>
                                </div>
                                
                                {(invited.isGoing === '') ?
                                <span>
                                <div className="feedback-btn" onChange={e => setFeedbackState(e.target.value)}>
                                    <p className="feedback-header">Joining:</p>
                                    
                                    {/* <input type="checkbox" id="switch" /><label for="switch">Toggle</label> */}
                                    <input type="radio" value="Yes" name="feedback"/> Yes
                                    <input type="radio" value="No" name="feedback"/> No
                                </div>
                           
                                </span>:
                                <span className="responded-block">
                                    <p className="responded-message">-- Joining-Slot: {invited.slot.isGoing} --</p>
                                    <button className="update-feedback-button" onClick={e => implementUpdateFeedback(e, invited.slot.slotId)}>Update Feedback</button>
                                </span>}

                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default ReservedSlot;