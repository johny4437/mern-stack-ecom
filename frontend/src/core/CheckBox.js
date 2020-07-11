import React,{useState, useEffect} from 'react'

function CheckBox({categories}) {
    return (
        categories.map((c, i) =>(
            <li key={i} className="list-unstyled">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-name">{c.name}</label>
            </li>
        ))
    )
}

export default CheckBox
