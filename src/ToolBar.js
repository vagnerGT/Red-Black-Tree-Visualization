import React from 'react';
import './App.css';

import ButtonContainer from './ButtonContainer';

function ToolBar() {
    return (
        <div className='tool-bar'>
            <ButtonContainer>
                <p>Button</p>
            </ButtonContainer>
        </div>
    );
};

export default ToolBar;