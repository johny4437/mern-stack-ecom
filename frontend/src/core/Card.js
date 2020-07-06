import React from 'react';
import {Link} from 'react-router-dom'

export default function Card({product}) {
    return (
        <div>
            <div className="col-4 mb-3">
                <div className="card">
                    <div className="card-header">{product.name}</div>
                    <div className="card-body">
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <Link to="/">
                            <div className="btn btn-outline-primary mt-2 mb-2">
                                View Product
                            </div>
                        </Link>
                        <div className="btn btn-outline-warning mt-2 mb-2">
                                Add to Cart
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
