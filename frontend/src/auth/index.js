import {API} from '../Config';

 export const singup = user =>{
    return fetch(`${API}/singup`,{
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

 export const singin = user =>{
    return fetch(`${API}/singin`,{
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
