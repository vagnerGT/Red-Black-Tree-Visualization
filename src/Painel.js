import React from 'react';
import './App.css';

import RedBlackTree from './RedBlackTree.js';

function Painel() {
    let test = [
        {
            UID: 0,
            selected: false,
            value: 50,
            color: 'red',
            position: {x: 0, y: 0},
            parentIndex: null,
            childIndex: [1, 2],
        },
        {
            UID: 1,
            selected: false,
            value: 51,
            color: 'red',
            position: {x: 500, y: 800},
            parentIndex: 0,
            childIndex: [null, null],
        },
        {
            UID: 2,
            selected: false,
            value: 53,
            color: 'black',
            position: {x: -100, y: -100},
            parentIndex: 0,
            childIndex: [null, null],
        },
    ];

    return (
        <div className='painel'>
            <RedBlackTree nodeArray={test} />
        </div>
    );
}

export default Painel;