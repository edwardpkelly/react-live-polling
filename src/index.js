import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './js/components/container/App';

const wrapper = document.getElementById("react-container");
wrapper ? ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, wrapper) : false;