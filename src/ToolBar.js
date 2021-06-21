import React from 'react';
import './App.css';

import AdderPad from './AdderPad.js';

function ToolBar(props) {

    return (
        <div className={'tool-bar'}>
            <AdderPad/>
        </div>
    );
};

export default ToolBar;