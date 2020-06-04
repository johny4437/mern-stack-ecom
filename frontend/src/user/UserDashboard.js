import React from 'react'
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index'

function UserDashboard () {

    const { user:{_id, name, email, role}} = isAuthenticated();


    return (
        <Layout title="Dashboard" description="User Dashboard" className="container">
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Register User"}</li>
                </ul>
            </div>
            <div className="card mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item"></li>
                  
                </ul>
            </div>
        </Layout>
    )
}

export default UserDashboard;