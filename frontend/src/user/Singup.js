import React,{useState} from 'react';
import Layout from '../core/Layout';
import {API} from '../Config';

 function Singup() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        sucess:false
    });

    const {name, email, password} = values;

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value });
    };

    const Singup = user =>{
        fetch(`${API}/singup`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"

            },
            body:JSON.stringify(user)

        })
        .then(response =>{
            return response.json()
        })
        .catch(err =>console.log(err))
    };

    const clickSubmit = event =>{
        event.preventDefault();
        Singup({name, email, password})

    }
    const singUpForm = () =>{
        return(
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange('name')}
                     type="text" 
                     className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input  onChange={handleChange('email')} type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input  onChange={handleChange('password')} type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
        );
    }
    return (
        <div>
            <Layout title="Singup" description="React Node E-commerce Site"
             className="container col-md-8 offset-md-2"
            >

                {singUpForm()}
            
            </Layout>
        
        </div>
    )
}

export default Singup;