import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Join = (props) => {
    const {
        handleJoin,
        handleUpdateMember
    } = props;

    return ( 
        <form action="javascript:void(0)" onSubmit={() => handleJoin()}>
            <label>Full Name</label>
            <input 
                className="form-control"
                placeholder="Enter your full name..."
                onChange={(event) => handleUpdateMember(event.target.value)}
                required />
            <button className="btn btn-primary">Join</button>
            <Link to="/speaker">Join as Speaker</Link>
            <Link to="/board">Got to the Board</Link>
        </form>

     );
};

Join.propTypes = {
    handleJoin: PropTypes.func.isRequired,
    handleUpdateMember: PropTypes.func.isRequired
};
 
export default Join;