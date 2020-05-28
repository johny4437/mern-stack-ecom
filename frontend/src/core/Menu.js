import React from 'react';
 import {Link, withRouter} from 'react-router-dom';
 const isActive = (history, path)=>{
    if(history.location.pathname===path){
        return {color:"#ff9900"}
    }else{
        return{color:"#ffffff"}
    }
}

function Menu({history}) {
    return (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history, "/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/singin")} to="/singin" >Singin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/singup")} to="/singup" >Singup</Link>
            </li>

        </ul>
    )
}


export default withRouter(Menu);