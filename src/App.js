import React, { useState } from 'react';
import logo from './logo.svg';
import {Input} from "./components/Input";
import {Output} from "./components/Output";
import './App.css';

const App = () => {
  const [values, setValues] = useState({capital: 0, years: 32, appreciation: 0.06, monthlySavings: 1000});

    return (
      <div>
        <div className="input">
          <Input values={values} onChange={setValues}/>
        </div>

        <div className="output">
          <Output values={values} />
        </div>
      </div>
   );
}

export default App;
