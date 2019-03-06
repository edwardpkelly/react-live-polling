import React from 'react';

const Display = (props) => {
    const { show } = props;
    return (show) ? <div>{props.children}</div> : null;
};

export default Display;