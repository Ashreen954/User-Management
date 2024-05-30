import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import './users.css'
import {Modal,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

function Users() {

  let getUsers=() => {
    // fetch("http://localhost:4000/users")
    // .then(response=>response.json())
    // .then(data=>console.log(data))
    // .catch(err=>console.log(err))
    axios.get("http://localhost:4000/users")
    .then(response=>{
      if(response.status===200){
        setUsers(response.data)
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
  
  let {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()

  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  let [userToEidt,setUsersToEdit]=useState({})

  const editUser=(userObj)=>{
    openModal()

    setUsersToEdit(userObj)

    setValue("name",userObj.name)
    setValue("email",userObj.email)
    setValue("dob",userObj.dob)
    setValue("userimg",userObj.userimg)
  }
  const saveModifiedUser=()=>{
    let modifiedUser=getValues()
    // console.log(modifiedUser)
    modifiedUser.id=userToEidt.id
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
    .then(response=>{
      if(response.status===200){
        getUsers()
      }}
    )
    .catch(err=>console.log(err))    
    closeModal()
  }

  let [removedUsers, setRemovedUsers] = useState([]);

  let navigate=useNavigate() //Programmatical Navigation to removed users

  let deletebtn=(userObj)=>{
    axios.delete(`http://localhost:4000/users/${userObj.id}`)
    .then(response=>{
      if(response.status === 200)
        {
          axios.post("http://localhost:4000/removed-users",userObj)
          .then(response=>{
            if(response.status === 201) {        
              navigate('/removed-users')      
            }})
            .catch(err=>console.log(err))
        }
      })
    }

  let [users,setUsers]=useState([])
  // console.log(users)
  
  let [error,setErrors]=useState('') //For errror while post request

  useEffect(()=>getUsers(),[])

 
  return (
    <div>
      <h1 className='text-white text-center mt-3'>Users</h1>
      {error.length!==0 && <h1 className='text-danger text-center mt-4'>{error}</h1> }
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 mx-auto  usercards'>
          {
            users.map((userObj)=>(
              <div className='col text-center mx-auto ' key={userObj.id}>
                <div className='card mt-3'>
                  <img src={userObj.userimg} alt="user img" className='mx-auto p-3 profile-img'/> 
                  <div className='card-body'>
                    <h5>{userObj.name}</h5>
                    <h6>{userObj.email}</h6>
                    <p>Dob: {userObj.dob}</p>
                    <button className='btn btn-warning float-start' onClick={()=>editUser(userObj)}>Edit</button>
                    <button className='btn btn-danger float-end ' onClick={()=>deletebtn(userObj)}>Delete</button>
                    </div>         
              </div>
              </div>
            ))
          }
      </div>

      {/*modal for edit*/}
      <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal '>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(saveModifiedUser)}>
        <div className='row '>
            <div className='mb-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' id="name" className='form-control' {...register("name",{required:true, minLength: 4, maxLength: 16})} />
              {errors.name?.type==="required" && <p className='text-danger'>*Name is required</p>}
                {errors.name?.type==="minLength" && <p className='text-danger'>*Minimum Length is required 4</p>}
                {errors.name?.type==="MaxLength" && <p className='text-danger'>*Maximum Length is required 16</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <input type='email' id="email" className='form-control'  {...register("email",{required:true})} />
                {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='dob'>Date of Birth</label>
                <input type='date' id="dob" className='form-control'  {...register("dob",{required:true})} />
                {errors.dob?.type==="required" && <p className='text-danger'>*Dob is required</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='userimg'>User Image Url</label>
                <input type='text' name="userimg" className='form-control'  {...register("userimg",{required:true})} disabled />
                {errors.userimg?.type==="required" && <p className='text-danger'>*User Image Profile is required</p>}
            
          </div>
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveModifiedUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
   
  )
}

export default Users