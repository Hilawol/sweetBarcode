import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import scanner from './components/Scanner';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={scanner} />
      </BrowserRouter>

    </div>
  );
}

export default App;
