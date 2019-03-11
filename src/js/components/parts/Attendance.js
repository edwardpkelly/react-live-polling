import React from 'react';

const Attendance = (props) => {
    return ( 
        <div>
            <h2>Attendance: {props.audience.length} members</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Audience Member</th>
                        <th>Socket ID</th>
                    </tr>
                </thead>
                <tbody>
                    {props.audience.map((item, index) => {
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
}
 
export default Attendance;