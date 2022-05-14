import React from 'react';
import { fetchSlotList } from '../services/fetchfunctions';

const SlotInformation = ({state, slot, onHomePage}) => {

    const getSlots = (e) => {
        e.preventDefault();
        fetchSlotList(state.username)
        .then((slots) => {
            onHomePage(slots.createdSlots, slots.bookedSlots, '')
        })
        .catch((err) => {
            onHomePage([], [], err.code);
        });
    };

    return(
        <div className="slot-details-container">
            <div className="link-back-home">
                <a
                  className="back-home"
                  href="https://slotlogin.com"
                  title="Click to go back HomePage"
                  onClick={(e) => getSlots(e)}>
                  Back-to-HomePagepage
                </a>
            </div>

            <div className="slot-details">
                <div className="slot-title">
                    <p className="heading-title">Presentation Topic</p>
                    <div className="title"><span>{slot.title}</span></div>
                </div>

                <div className="slot-host">
                    <p className="heading-title"> Student-Name</p>
                    <div className="host"><span>{slot.host}</span></div>
                </div>

                <div className="slot-date">
                    <p className="heading-title">Slot-Book-Date</p>
                    <div className="date"><span>{slot.date}</span></div>
                </div>

                <div className="slot-time">
                    <p className="heading-title">Slot-Book-Time</p>
                    <div className="time"><span>{slot.time}</span></div>
                </div>

                <div className="slot-place">
                    <p className="heading-title">Vennue</p>
                    <div className="place"><span>{slot.place}</span></div>
                </div>

                <div className="slot-description">
                    <p className="heading-title">Topic-Discription</p>
                    <div className="description"><span>{slot.description}</span></div>
                </div>
                
                <div className="slot-members">
                    <p className="heading-title">Call-Members</p>
                    {
                      Object.values(slot.members).map((member, key) => (
                        <div className="member-names" key={key}>
                          <span>{member}</span>
                        </div>
                      ))
                    }
                </div>
      
            </div>
        </div>
        
    );
};

export default SlotInformation;
