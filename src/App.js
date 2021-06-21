import React from 'react';
import './App.css';

import ToolBar from './ToolBar.js';
import Painel from './Painel.js';



function App() {

  return (
    <div className={'app'}>
      <ToolBar/>
      <Painel/>
    </div>
  );
}

export default App;
