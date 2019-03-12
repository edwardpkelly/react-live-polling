import React from 'react';
import PropTypes from 'prop-types';

const Display = (props) => {
    const { 
        show,
        children
    } = props;

    return (show) ? <div>{children}</div> : null;
};

Display.propTypes = {
    show: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    children: PropTypes.node.isRequired
};

export default Display;