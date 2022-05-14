import { useState } from 'react';

function Play({ setGuessWord }) {
    const [input, setInput] = useState('');
    const updateInput = (e) => setInput(e.target.value);
    return (
        <div className="guess-form">
            <span><b>Enter your guess:</b> </span>
            <input onChange={updateInput} value={input}></input>
            <button onClick={() => { setGuessWord(input); setInput('') }} disabled={input ? false : true}><b>OK</b></button>
        </div>
    );
};
export default Play;