import React from 'react';

const CreateSlotBtn = ({onCreateSlot}) => {
    
    return (    
        <button className="create-slot-btn"  title="Click to Create New Slot" onClick={onCreateSlot}>
        Book Slot 
        </button>
    );
};

export default CreateSlotBtn;



