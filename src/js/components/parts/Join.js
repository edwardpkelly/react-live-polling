import React from 'react';

const Join = (props) => {
    return ( 
        <form action="javascript:void(0)" onSubmit={() => props.handleJoin()}>
            <label>Full Name</label>
            <input 
                className="form-control"
                placeholder="Enter your full name..."
                onChange={(event) => props.handleUpdateName(event.target.value)}
                required />
            <button className="btn btn-primary">Join</button>
        </form>
     );
}
 
export default Join;