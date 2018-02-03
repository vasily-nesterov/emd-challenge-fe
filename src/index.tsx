import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

import './index.css';

//-----------------------------------------------------------------------------
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(<App />, rootElement);
