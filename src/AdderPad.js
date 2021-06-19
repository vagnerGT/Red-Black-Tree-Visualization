import React, { useRef } from 'react';
import './App.css';

import ButtonContainer from './ButtonContainer.js';

function AdderPad(props) {
    const value = useRef('');

    function handleChange(e) {
        value.current = e.target.value;
    }

    function handleClick(e) {
        console.log(value.current);
    }

    return (
        <div className={'pad'}>
            <input className={'pad-textbox'} onChange={handleChange} />
            <ButtonContainer onClick={handleClick}>
                ADD
            </ButtonContainer>
        </div>
    );
}

export default AdderPad;