import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'

function Removedusers() {
  
  let [error,setErrors]=useState('') //For errror while get request

 // very important so when the page is loaded we have to get the removed users
 let [removedUsers,setRemovedUsers]=useState([])
 useEffect(() => {
  getRemovedUsers();
}, []);

  const getRemovedUsers = () => {
  axios.get("http://localhost:4000/removed-users")
  .then(response=>{
    // console.log(response)
    if(response.status===200){
      setRemovedUsers(response.data)
    }
  })
  .catch(err=>{
    // console.log(err)
    if(err.response){
      setErrors(err.message)
    }
    else if(err.request){
      setErrors(err.message)
    }
    else{
      setErrors(err.message)
    }
  })
  }
 
  let restoreUser=(userObj)=>{
    axios.delete(`http://localhost:4000/removed-users/${userObj.id}`)
    .then(response=>
      {
        if(response.status===200){
        axios.post("http://localhost:4000/users",userObj)
        .then(response=>{
          if(response.status===201)
            getRemovedUsers()
        })
        .catch(err=>console.log(err))
        
        }
      }
    )
    .catch(err=>console.log(err))

    
  }

  return (
    <div>
        <h1 className='text-white text-center mt-3'>Removed Users</h1>
      {error.length!==0 && <h1 className='text-danger text-center mt-4'>{error}</h1> }
      {removedUsers.length===0 ? (  
        <div className='d-flex justify-content-center align-items-center mt-5'>
        <img src='https://media2.giphy.com/media/3ohhwsjzpejaSWoTkI/200w.gif?cid=6c09b952esvki2dd9ulgrh1le2900emzobus5k9nzwmbuk6c&ep=v1_gifs_search&rid=200w.gif&ct=g' width={500}/>
        </div>
      )  : (
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 mx-auto  usercards'>
          {
            removedUsers.map((userObj)=>(
              <div className='col text-center mx-auto ' key={userObj.id}>
                <div className='card mt-3'>
                  <img src={userObj.userimg} alt="user img" className='mx-auto p-3 profile-img'/> 
                  <div className='card-body'>
                    <h5>{userObj.name}</h5>
                    <h6>{userObj.email}</h6>
                    <p>Dob: {userObj.dob}</p>
                    <button className='btn btn-warning' onClick={()=>restoreUser(userObj)}>Restore</button>
                    </div>         
              </div>
              </div>
            ))
          }
      </div>)
      }
    </div>
  )
}

export default Removedusers