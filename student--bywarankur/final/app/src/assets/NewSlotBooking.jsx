import React, {useState} from 'react';
import { fetchSlotList, fetchCreateMeetupPage, fetchSlotForUser } from '../services/fetchfunctions';

const NewSlotBooking = ({state, users, onDetails, onHomePage}) => {

    const [title, setSlotTitle] = useState('');
    const [place, setSlotPlace] = useState('');
    const [date, setSlotDate] = useState('');
    const [time, setSlotTime] = useState('');
    const [description, setSlotAgenda] = useState('');

    const userList = Object.keys(users);
    let selectedMembers = [];

    const implementUserAction = () => {
        
        const members = document.querySelector('#members');
        
        if (userList.length > 1) {
            selectedMembers = [].filter.call(members.options, option => option.selected).map(option => option.text);
        }

        
    
        fetchCreateMeetupPage(title, state.username, place,
            date, time, description, selectedMembers)
        .then((slot) => {
            fetchSlotForUser(slot.slotId)
            .then((slot) => {
                onDetails(slot, '');
            })
            .catch((err) => {
                onDetails({}, err.code);
            });
        })
        .catch((err) => {
            onDetails({}, err.code);
        });
    };

    const getSlots = (e) => {
        e.preventDefault();
        fetchSlotList(state.username)
		.then((slots) => {
			onHomePage(slots.createdSlots, slots.bookedSlots, '');
		})
		.catch((err) => {
			onHomePage([], [], err.code);
		});
    };


    return (
  
        <div className="create-slot-container">

            <div className="link-back-home">
                <a
                  className="back-home"
                  href="https://slotlogin.com"
                  title="Click to go back HomePage"
                  onClick={(e) => getSlots(e)}>
                    Back-to-HomePagepage
                </a>
            </div>

            <div className="new-slot-page">
                <div className="slot-title">
                    <p className="heading-title">Topic</p>
                    <textarea className="new-slot-title" id="title" value={title} onChange={e => setSlotTitle(e.target.value)} name="title" rows="2" cols="50"></textarea>
                </div>

                <div className="slot-date">
                    <p className="heading-title">Slot-Booking-Date</p>
                    <textarea className="new-slot-date" id="date" value={date} onChange={e => setSlotDate(e.target.value)} name="date" rows="2" cols="50"></textarea>
                </div>

                <div className="slot-time">
                    <p className="heading-title">Slot-Booking-Time</p>
                    <select id="time"  className="new-slot-date"  value={date} onChange={e => setSlotTime(e.target.value)} name="time" rows="2" cols="50">
            <option>1:00pm</option>
            <option>2:00pm</option>
            <option>3:00pm</option>
            <option>4:00pm</option>
            <option>5:00pm</option>
            <option>6:00pm</option>
           
         </select>
                    
                </div>

                <div className="slot-place">
                    <p className="heading-title">vennue</p>
                    <select  id="place"  className="new-slot-place"  value={date} onChange={e => setSlotPlace(e.target.value)} name="time" rows="2" cols="50">
            <option>Seattle</option>
            <option>Portland</option>
            <option>Quincy</option>
            <option>newyork</option>
            <option>Hawai</option>
         
         </select>
                </div>

                <div className="slot-description">
                    <p className="heading-title">Topic-Discription</p>
                    <textarea className="new-slot-description" id="description" value={description} onChange={e => setSlotAgenda(e.target.value)} name="description" rows="4" cols="100"></textarea>
                </div>

                { userList.length <= 1 ? <p>Oops! No member Present! Book slot and come back later to add members!!</p> :
                <div>
                    <p className="instructions"> Press hold Ctrl/Command button for selecting multiple member</p>
                    <div className="select-users">
                        <label className="select-users">Select Members to join :</label>
                        <div>
                        <select className="filter-list" id="members" multiple size="users.length">
                        <option value='' disabled hidden></option>

                        { Object.values(users)
                            .filter((user) => user.username !== state.username)
                            .map((user, key) => (
                              <option key={key} value={user.username}>
                                {user.username}
                              </option>
                            ))
                        }

                        </select>
                        </div>
                    </div>
                </div>
                }
            </div>
            <button className="reserve-btn" type="submit" onClick={implementUserAction}>
            Reserve-Slot
            </button>
        </div>
    );



};

export default NewSlotBooking;
