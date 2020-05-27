import React from 'react';
 import {Link, withRouter} from 'react-router-dom';


function Menu() {
    return (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/singin">Singin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/singup">Singup</Link>
            </li>

        </ul>
    )
}


export default Menu;