import React, {useState, useLayoutEffect} from 'react';
import './App.css';

import ToolBar from './ToolBar.js';
import Painel from './Painel.js';



function App() {
  const [flow, setflow] = useState('x');

  useLayoutEffect(() => {
    const handleResize = (e) => {
      let windowSize = {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      }
      if (windowSize.width >= windowSize.height) setflow('x');
      if (windowSize.height > windowSize.width) setflow('y');
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={'app app-grid-' + flow}>
      <ToolBar />
      <Painel />
    </div>
  );
}

export default App;
