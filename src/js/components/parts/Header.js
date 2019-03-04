import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <header className="row">
            <div className="col-xs-10">
                <h1>{props.title}</h1>
            </div>
            <div className="col-xs-2">
                <span id="connection-status" className={props.status}></span>
            </div>
        </header>
    );
}

Header.defaultProps = {
    status: "disconnected"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};
 
export default Header;