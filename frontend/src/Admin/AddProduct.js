import React,{useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {createProduct,getCategory}  from './apiAdmin';
import { Link } from 'react-router-dom';

function AddProduct(){


    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''

    });

    const {name,
    price,
    description,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData} = values;
// GET CATEGORIES
    const init = () =>{
        getCategory().then(data =>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values,
                    categories:data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(()=>{
        init();
    },[])






    const {user, token} = isAuthenticated();
    const handleChange = name => event =>{
            const value = name === 'photo' ? event.target.files[0] : event.target.value;
            formData.set(name,value)
            setValues({...values,[name]:value});
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:'', loading:true});
        createProduct(user._id, token, formData)
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, name:'', photo:'', 
                description:'',
                price:'',
                quantity:'',
                loading:false,
                createdProduct:data.name
            })
            }
        })
    }

    // SHOW ERROR
    const showError = () =>(
        <div className="alert alert-danger" style={{display: error  ? '' : 'none'}}>
            {error}
        </div>
    );
    // SHOW SUCCESS
    const showSuccess = () =>(
        <div className="alert alert-info" style={{display: createdProduct  ? '' : 'none'}}>
            <h2> {`${createdProduct}`} is created </h2>
        </div>
    );
    // SHOW LOADING
    const showLoading = () =>(
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )
    // POST FORM
    const newPostForm = () =>(
        <form  onSubmit={clickSubmit} className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea 
                onChange={handleChange('description')} 
                type="text" 
                className="form-control" 
                value={description} />
            </div>
            {/* Price */}
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input 
                onChange={handleChange('price')} 
                type="number" 
                className="form-control" 
                value={price} />
            </div>
            {/* CATEGORY */}
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select 
                onChange={handleChange('category')} 
                className="form-control" 
                >
                <option>Please Select</option>
                {categories && categories.map((c, i) =>(
                    <option key={i} value={c._id}>{c.name}</option>
                ))}
                </select>
            </div>
            {/* QUANTITY */}
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input 
                onChange={handleChange('quantity')} 
                type="number" 
                className="form-control" 
                value={quantity} />
            </div>
            {/* SHIPPING */}
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select 
                onChange={handleChange('shipping')} 
                className="form-control" 
                >
                <option value="0">No</option>
                <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
            
        </form>
    );
   
    return (
        <Layout title="Add a New product" 
        description={`Welcome ${user.name}!!`} 
        >
           <div className="row">
                <div className="col md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    
                    {newPostForm()}
                    {showSuccess()}
                </div>

           </div>
       
            
        
        
        
        
         </Layout>
    )



}


export default AddProduct;