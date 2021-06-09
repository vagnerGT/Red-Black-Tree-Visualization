import React from 'react';
import './App.css';

function ButtonContainer(props){

    return (
        <button 
            onClick={props.onClick}
            className='button-container'
        >
            {props.children}
        </button>
    );
}

export default ButtonContainer;