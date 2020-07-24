import React,{useState, useEffect} from 'react';
import Layout from './Layout';
import {getCart, removeItem} from "./cartHelpers"
import {Link} from 'react-router-dom'
import Card from  './Card';

function Cart(){

    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(getCart())
    }, [items])

    const showitems = item =>{
        return(
            <div>
                <h2>Your cart has {`${item.length}`}Items</h2>
                <hr/>
                {items.map((product, i)=>(
                    <Card key={i} 
                    product={product} 
                    showAddToCartButton={false}
                    cartUpdate = {true}
                    showRemoveProductButton={true}
                    />
                ))}
            </div>
        )
    }

    const noItemsMessage = () =>(
        <h2>Your cart is empty.<br/><Link to="/shop">Continue Shopping</Link></h2>
    )

    return(

        <Layout title=" Shopping Cart" 
        description="Manage Cart Items"
        className="container-fluid"
        >

       <div className="row">
           <div className="col-6">
               {items.length > 0 ? showitems(items) : noItemsMessage()}
           </div>
           <div className="col-6">
               <h2>CheckOut Options</h2>
           </div>
       </div>
     
        </Layout>
    );

}

export default Cart;