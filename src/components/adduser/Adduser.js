import './adduser.css';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Adduser() {

  let navigate=useNavigate() //Programmatical Navigation to users

  let [error,setErrors]=useState('') //For errror while post request

  let {register,handleSubmit,formState:{errors}}=useForm()



  let formsubmit=(userobj)=>{
    // console.log(userobj)
     
    // fetch("http://localhost:4000/users",{
    //   method:"POST",
    //   headers: {"Content-Type":"application/json"},
    //   body: JSON.stringify(userobj)
    // })
    // .then(response=>response.json())
    // .then(data=>console.log(data))
    // .catch(err=>console.log(err))

    axios.post("http://localhost:4000/users",userobj)
    .then(response=>{
      if(response.status===201){
        navigate('/users')
      }
      // console.log(response)
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

  return (
    <div>
      <div className='container-fluid mt-5'>

        <h1 className='text-center mb-5 text-white'>Add New User</h1>
        {
          error.length!==0 ? <h1 className='text-danger text-center mt-4'>{error}</h1> : 
        
        <form onSubmit={handleSubmit(formsubmit)}>

          <div className='row'>
            <div className='col-11 col-sm-8 col-md-5 mx-auto'>
            
              <div className='mb-3'>
                <label htmlFor='name' className='text-white'>Name</label>
                <input type='text' id="name" className='form-control' {...register("name",{required:true, minLength: 4, maxLength: 16})} />
                {errors.name?.type==="required" && <p className='text-danger'>*Name is required</p>}
                {errors.name?.type==="minLength" && <p className='text-danger'>*Minimum Length is required 4</p>}
                {errors.name?.type==="maxLength" && <p className='text-danger'>*Maximum Length is required 16</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='text-white'>Email</label>
                <input type='email' id="email" className='form-control'  {...register("email",{required:true})} />
                {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor='dob' className='text-white'>Date of Birth</label>
                <input type='date' id="dob" className='form-control'  {...register("dob",{required:true})} />
                {errors.dob?.type==="required" && <p className='text-danger'>*Dob is required</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor='userimg' className='text-white'>User Image Url</label>
                <input type='text' name="userimg" className='form-control'  {...register("userimg",{required:true})} />
                {errors.userimg?.type==="required" && <p className='text-danger'>*User Image Profile is required</p>}
              </div>
              
            <button className='btn btn-success' type='submit'><FaUserPlus /> Create New User</button> 
            </div>
          </div>
           
        </form>
}
      </div>
    </div>
  )
}

export default Adduser