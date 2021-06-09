import React, { useEffect, useState } from 'react';
import './App.css';

import TreeNode from './TreeNode.js';

function RedBlackTree(props) {
    const [state, setState] = useState({
        pos: {x: 200, y: 200},
        linePos: {x: 0, y: 0},
    });

    useEffect(() => {
        setTimeout(() => {
            setState({
                pos: {x: 200, y: 400},
                linePos: {x: 300, y: 200},
            });
        }, 100);
    }, []);

    const pos = state.pos;
    const linePos = state.linePos;

    //<TreeNode value={15} speed={2} linePos={linePos} pos={linePos} color={'Red'} />
    return (
        <div className='red-black-tree'>
            <TreeNode 
                value={50}
                speed={1}
                linePos={{ x: linePos.x, y: linePos.y }}
                pos={{ x: pos.x, y: pos.y }}
                color={'Red'}
            />
        </div>
    );
}

export default RedBlackTree;