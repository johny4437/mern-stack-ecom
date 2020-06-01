import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Layout from '../core/Layout';
import {singup} from '../auth/'

 function Singup() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name, email, password, success, error} = values;

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value });
    };

   

    const clickSubmit = event =>{
        event.preventDefault();
        setValues({...values, error:false})
        singup({name, email, password}).then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success:false})    
            }else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
               
                })
            }
        })

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
                     value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input  
                onChange={handleChange('email')} 
                type="email" 
                className="form-control"
                value={email}
            />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input  
                onChange={handleChange('password')} 
                type="password" 
                className="form-control"
                value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
        );
    };

    const showError = () =>{
        return (
            <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>

            {error}

        </div>
        );
    };

    const showSucess = () =>{
        return (

            <div className="alert alert-info"  style={{display:success ? '' : 'none'}}>
            New account was created. Please <Link to="/singin">Singin</Link>
             </div>

        );
    }
    return (
        <div>
            <Layout title="Singup" description="React Node E-commerce Site"
             className="container col-md-8 offset-md-2"
            >
                {showSucess()}
                {showError()}
                {singUpForm()}
            
            </Layout>
        
        </div>
    )
}

export default Singup;