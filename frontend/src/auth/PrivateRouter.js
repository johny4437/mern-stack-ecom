import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index'

function PrivateRouter({component:Component, ...rest}) {
    return (
        <Route {...rest}  render={props => isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname:'/singin', state:{from:props.location}}}/>
        )
        } />
    )
}
export default  PrivateRouter;