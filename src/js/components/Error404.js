import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return ( 
        <div id="not-found">
            <h1>404 Error: Not Found!</h1>
            <p>The page that you have requested cannot be found.
                Were you looking for one of the following:</p>
                <Link to="/">Join as Audience</Link>
                <Link to="/speaker">Join as Speaker</Link>
                <Link to="/board">View the Board</Link>
        </div>
     );
}
 
export default Error404;