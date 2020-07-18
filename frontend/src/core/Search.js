import React,{useState, useEffect} from 'react';
import {getCategories, list} from '../core/apiCore';
import Card from  './Card';
function Search() {
    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false

    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () =>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories:data})
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, []);


    const searchData = () =>{
        // console.log(search, category);
       if(search){
           list({search:search || undefined, category:category})
           .then(response=>{
               if(response.error){
                   console.log(response.error)
               }else{
                   setData({...data, results:response, searched:true})
               }
           })
       }
        
    }

    const searchSubmit = e =>{
        e.preventDefault();
        searchData();

    }

    const handleChange = (name) => e =>{
        setData({...data, [name]:e.target.value, searched:false })
    }


    const searchedProducts = (results = [] )=>{
        return(
            <div className="row">
                {results.map((product,i)=>(
                    <Card  key={i} product={product}/>
                ))}
            </div>
        )

    }
    const searchForm = () =>{
        return(
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                    
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>

                            <option value="All">Pick Category</option>
                            {categories.map((c,i)=>(
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}

                        </select>
                    </div>

                    <input 
                    type="search" 
                    className="form-control" 
                    onChange={handleChange('search')}
                    />
                    
                    </div>
                    <div className="btn input-group-append" style={{border:'none'}}>
                                <button className="input-group-text">Search</button>
                </div>
                </span>
                
            </form>
        )
    }

    return (
        <div className="row">
            <div className="container mb-3">

                    {searchForm()}
                
            </div>
            <div className="container-fluid mb-3">

                    {searchedProducts(results)}
                
            </div>
        </div>
    )
}

export default Search