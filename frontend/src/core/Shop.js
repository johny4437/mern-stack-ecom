import React,{useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from './apiCore';
import Card from  './Card';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import prices from './fixedPrices';


function Shop() {

    const [myFilters, setMyFilters] = useState({
        filters:{category:[], price:[]}
    })
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

    const handleFilters = (filters, filtersBy) =>{
        // console.log("SHOP",filters, filtersBy)

        const newFilters = {...myFilters};
        newFilters.filters[filtersBy] = filters;
        setMyFilters(newFilters);
    }
    return (
        <Layout title="Shop Page" description="React Node E-commerce Site">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul>
                        <  CheckBox 
                        categories={categories}
                        handleFilters={filters =>{
                            handleFilters(filters,'category')
                        }}
                        />
                    </ul>
                    <h4>Filter by Prices</h4>
                    <div>
                        <  RadioBox 
                        prices={prices}
                        handleFilters={filters =>{
                            handleFilters(filters,'prices')
                        }}
                        />
                    </div>
                </div>
                <div className="col-8">
                       {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
