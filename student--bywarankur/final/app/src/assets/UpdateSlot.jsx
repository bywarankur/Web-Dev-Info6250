import React, {useState} from 'react';
import { fetchUpdateSlot, fetchSlotList, fetchSlotForUser} from '../services/fetchfunctions';


const UpdateSlot = ({state, slot, users, onHomePage, onDetails}) => {

    const [title, setSlotTitle] = useState(slot.title);
    const [place, setSlotPlace] = useState(slot.place);
    const [date, setSlotDate] = useState(slot.date);
    const [time, setSlotTime] = useState(slot.time);
    const [description, setSlotAgenda] = useState(slot.description);

    const userList = Object.keys(users);
    let selectedMembers = [];

    const implementUserAction = () => {

        const members = document.querySelector('#members');

        if (userList.length > 1) {
            selectedMembers = [].filter
              .call(members.options, (option) => option.selected)
              .map((option) => option.text);
        }
        fetchUpdateSlot(title, slot.slotId, state.username, place,
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
        <div className="update-slot-container">

            <div className="link-back-home">
                <a
                  className="back-home"
                  href="https://slot.com"
                  title="Click to go back HomePage"
                  onClick={(e) => getSlots(e)}>
                  Back HomePage
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
                    <p className="heading-title">Vennue</p>
                    <textarea className="new-slot-place" id="place" value={place} onChange={e => setSlotPlace(e.target.value)} name="place" rows="2" cols="50"></textarea>
                </div>

                <div className="slot-description">
                    <p className="heading-title">Topic-Description</p>
                    <textarea className="new-slot-description" id="description" value={description} onChange={e => setSlotAgenda(e.target.value)} name="description" rows="2" cols="150"></textarea>
                </div>

                { userList.length <= 1 ? <p>Oops! No members found!! Update Event and come back later to add members!!</p> :
                <div>
                    <p className="instructions"> Press hold Ctrl/Command button for selecting multiple members</p>
                    <div className="select-users">
                        <label className="select-users">Select Members :</label>
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
                }
            </div>

            <button className="reserve-btn" type="submit" onClick={implementUserAction}>
              Update-Reserved-slot
            </button>
        </div>
    );

};

export default UpdateSlot;