import React from 'react';
import './App.css';

import TreeNode from './TreeNode.js';

// prioritize root node on x:0, y:0
/* nodeData {
    UID: 0,
    selected: false,
    value: 50,
    color: 'black',
    position: {x: 0, y: 0},
    parentIndex: null,
    childIndex: [null, null],
}; */

function RedBlackTree(props) {
    function generateNodesAndTreeSize(nodeArray) {
        if(!nodeArray) return;
        var pos = {min: {x: null, y: null}, max: {x: null, y: null}};

        const nodes = nodeArray.map((item, index, array) => {
            pos.min.x = Math.min(pos.min.x ?? item.position.x, item.position.x);
            pos.min.y = Math.min(pos.min.y ?? item.position.y, item.position.y);
            pos.max.x = Math.max(pos.max.x ?? item.position.x, item.position.x);
            pos.max.y = Math.max(pos.max.y ?? item.position.y, item.position.y); 

            return <TreeNode {...{
                key: item.UID.toString(),
                speed: 1,
                UID: item.UID,
                selected: item.selected,
                value: item.value,
                color: item.color,
                linePos: array[item.parentIndex]?.position || null,
                pos: item.position,
                parentUID: array[item.parentIndex]?.UID || null,
                childUID: item.childIndex.map(value => array[value]?.UID || null),
            }} />
        });

        return [
            nodes, 
            {
                x: (pos.max.x - pos.min.x), 
                y: (pos.max.y - pos.min.y),
                minX: (pos.min.x < 0 ? -pos.min.x : 0),
                minY: (pos.min.y < 0 ? -pos.min.y : 0),
            },
        ];
    }

    const [nodes, treeSize] = generateNodesAndTreeSize(props.nodeArray);
    return (
        <div className={'red-black-tree'}>
            <div style={{width: (treeSize.x + 'px'), height: (treeSize.y + 'px')}}>
                <div style={{left: treeSize.minX, top: treeSize.minY}}>
                    {nodes}
                </div>
            </div>
        </div>
    );
}

export default RedBlackTree;