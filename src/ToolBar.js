import React from 'react';
import './App.css';

import AdderPad from './AdderPad.js';

function ToolBar(props) {
    const direction = props.direction === 'y' ? 'column' : 'row';

    return (
        <div style={{flexDirection: direction}} className='tool-bar'>
            <AdderPad/>
        </div>
    );
};

export default ToolBar;