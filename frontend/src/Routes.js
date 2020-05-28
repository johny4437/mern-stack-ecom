import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Singup from './user/Singup';
import Singin from './user/Singin';
import Home from './core/Home';



 function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/singin" exact component={Singin}/>
                <Route path="/singup"   exact component={Singup}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;