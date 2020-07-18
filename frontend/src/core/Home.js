import React,{useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from '../core/apiCore';
import Card from  './Card';
import Search from './Search';

 function Home() {

    const [ productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // Function to load products By Sell

    const loadProductsBySell = () =>{
        getProducts('sold').then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsBySell(data)
            }
        })
    }
    //Load Products By Arrival
    const loadProductsByArrival = () =>{
        getProducts('createdAt').then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsByArrival(data)
            }
        })
    }

useEffect(()=>{
    loadProductsByArrival()
    loadProductsBySell()
},[])


    return (
        <div>
           <Layout title="Home Page" description="React Node E-commerce Site">

               <Search/>    

           <h2 className="mb-4">Products Arrival</h2>
              <div className="row">
              
              {productsBySell.map((product,i)=>(
                  <Card key={i} product={product}></Card>
              ))}
              </div>
              <h2 className="mb-4">Best Sellers</h2>

              <div className="row">
                {productsBySell.map((product,i)=>(
                  <Card key={i} product={product}></Card>
                ))}
              </div>
             

            
           </Layout>

        </div>
    )
}
export default Home;
