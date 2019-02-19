import React from 'react';
import ReactDOM from 'react-dom';

import ReactContainer from './js/components/container/ReactContainer.jsx';

const wrapper = document.getElementById("react-placeholder");
wrapper ? ReactDOM.render(<ReactContainer />, wrapper) : false;

