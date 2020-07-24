import React from 'react';
 import {Link, withRouter} from 'react-router-dom';
import {singout, isAuthenticated} from  '../auth';
import {totalItems} from   './cartHelpers';


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
                <Link className="nav-link"  style={isActive(history, "/shop")} to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"  
                style={isActive(history, "/cart")} 
                to="/cart">
                   Cart<i class="fa fa-shopping-cart" aria-hidden="true"></i>


                    <sup>
                        <small className="cart-badge">{totalItems()}</small>
                    </sup>
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 &&(
                <li className="nav-item">
                    <Link className="nav-link" 
                    style={isActive(history, "/user/dashboard")} 
                    to="/user/dashboard" >Dashboard
                    </Link>
                 </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 &&(
                <li className="nav-item">
                    <Link className="nav-link" 
                    style={isActive(history, "/admin/dashboard")} 
                    to="/admin/dashboard" >Dashboard
                    </Link>
                 </li>
            )}
            {!isAuthenticated() && (
                <>               
                 <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/singin")} to="/singin" >Singin</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/singup")} to="/singup" >Singup</Link>
                </li>
               
                </>

            )}

            
            {isAuthenticated() && (
                <li className="nav-item">
                <span className="nav-link"
                 style={{cursor:'pointer', color:'#ffffff'}}
                 onClick={()=> singout(()=>{
                     history.push("/")
                 })}
                  >
                    Singout
                </span>
            </li>

            )}

        </ul>
    )
}


export default withRouter(Menu);