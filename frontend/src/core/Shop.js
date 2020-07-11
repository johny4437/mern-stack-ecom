import React,{useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from './apiCore';
import Card from  './Card';
import CheckBox from './CheckBox';


function Shop() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () =>{
        getCategories().then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setCategories(data);
            }
        })
    }

    useEffect(()=>{
        init()
    },[]);
    return (
        <Layout title="Shop Page" description="React Node E-commerce Site">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul>
                        <  CheckBox categories={categories}/>
                    </ul>
                </div>
                <div className="col-4">
                        content
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
