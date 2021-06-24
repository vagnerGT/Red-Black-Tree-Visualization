import React, {useEffect, useState, useRef} from 'react';
import './App.css';

// eslint-disable-next-line no-lone-blocks
{

}

function useAnimatedState(props) {
    const [state, setState] = useState({
        pos: props.pos.data,
        linePos: props.linePos.data,
    });
    const {current: data} = useRef({
        pos: {start: state.pos, final: state.pos, startTime: null, duration: 1000},
        linePos: {start: state.linePos, final: state.linePos, startTime: null, duration: 1000},
    });
    const updaterFunctions = {
        pos: (progress) => {
            let x = data.pos.start.x + (data.pos.final.x - data.pos.start.x) * progress;
            let y = data.pos.start.y + (data.pos.final.y - data.pos.start.y) * progress;
            return {x, y};
        },
        linePos: (progress) => {
            let x = data.linePos.start.x + (data.linePos.final.x - data.linePos.start.x) * progress;
            let y = data.linePos.start.y + (data.linePos.final.y - data.linePos.start.y) * progress;
            return {x, y};
        },
    };

    const {current: singleFrameRequester} = useRef({
        id: null,
        request: function() {
            if(!this.id)
                this.id = window.requestAnimationFrame(() => {
                        const didAnimationsFinish = updateState();

                        singleFrameRequester.id = null;
                        if(!didAnimationsFinish)
                            singleFrameRequester.request();
                });
        },
        cancel: function() {
            if(singleFrameRequester.id)
                window.cancelAnimationFrame(singleFrameRequester.id);
        },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => singleFrameRequester.cancel, []);

    function updateState(){
        let newState = {};
        let didAnimationsFinish = true;
        const now = Date.now();

        const easeOut = (value) => value + (value * (1 - value));
        for(const key in state){
            let progress = easeOut(Math.min((now - data[key].startTime) / data[key].duration, 1));
            newState[key] = data[key].startTime === null ? state[key] : updaterFunctions[key](progress);
            if(progress >= 1) data[key].startTime = null; else didAnimationsFinish = false;
        }
        setState(newState);
        return didAnimationsFinish;
    };

    function deepCheck(obj1, obj2){
        if (obj1 !== null && typeof obj1 === 'object'){
            for(const key in obj1)
                if(!deepCheck(obj1[key], obj2?.[key])) return false;
        }else{
            if(obj1 !== obj2) return false;
        }
        return true;
    };

    function updateData() {
        let didDataChange = false;
        const now = Date.now();

        for(const key in state)
            if(!deepCheck(data[key].final, props[key]?.data)){
                didDataChange = true;
                data[key] = {
                    start: state[key],
                    final: props[key].data,
                    startTime: now,
                    duration: props[key].time,
                };
            };
        if(didDataChange) singleFrameRequester.request();
    };

    updateData();
    return state;
}

//Tree Node
function TreeNode(props) {
    const state = useAnimatedState({
        pos: {data: props.pos, time: 1000 / props.speed},
        linePos: {data: props.linePos || props.pos, time: 1000 / props.speed},
    });

    const bgColor = props.color === 'Black' ? 'black' : 'rgb(160, 45, 45)';
    const pos = state.pos;
    const linePos = {x: state.linePos.x - state.pos.x, y: state.linePos.y - state.pos.y};
    const absLinePos = {x: Math.abs(linePos.x)+10, y: Math.abs(linePos.y)+10};

    return (
        <div style={{ left: pos.x, top: pos.y }} className='tree-node'>
            <div style={{ backgroundColor: bgColor }} className='circle'>
                <span className='node-text'>{props.value}</span>
            </div>

            <svg 
                xmlns='http://www.w3.org/2000/svg' 
                width={absLinePos.x * 2} 
                height={absLinePos.y * 2} 
                className='svg-line'
            >
                <path
                    d={
                        'M' + (absLinePos.x) + ' ' + (absLinePos.y) +
                        ' L' + (absLinePos.x + linePos.x) + ' ' + (absLinePos.y + linePos.y) +
                        ' Z'
                    }
                    fill='#008b8b'
                    stroke='#008b8b'
                    strokeWidth='5'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
}

export default TreeNode;