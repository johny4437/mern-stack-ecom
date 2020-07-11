import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Singup from './user/Singup';
import Singin from './user/Singin';
import Home from './core/Home';
import PrivateRouter from './auth/PrivateRouter';
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct';
import Shop from  './core/Shop';

 function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/singin" exact component={Singin}/>
                <Route path="/singup"   exact component={Singup}/>
                <PrivateRouter path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;