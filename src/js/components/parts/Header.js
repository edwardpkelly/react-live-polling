import React from 'react';
import PropTypes from 'prop-types';

import AppConstants from '../../../js/constants/app-constants';

const Header = props => {
    const {
        title,
        speaker,
        status
    } = props;

    return (
        <header className='row'>
            <div className='col-xs-10'>
                <h1>{title}</h1>
                <p>{speaker}</p>
            </div>
            <div className='col-xs-2'>
                <span id='connection-status' className={status} />
            </div>
        </header>
    );
};

Header.defaultProps = {
    status: AppConstants.DISCONNECTED
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
    speaker: PropTypes.string
};

export default Header;
