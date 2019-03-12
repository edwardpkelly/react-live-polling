import React from 'react';
import PropTypes from 'prop-types';

const Attendance = props => {
    const { audience } = props;

    return (
        <div>
            <h2>Attendance: {audience.length} members</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Audience Member</th>
                        <th>Socket ID</th>
                    </tr>
                </thead>
                <tbody>
                    {audience.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

Attendance.propTypes = {
    audience: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Attendance;
