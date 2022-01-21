import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let Navigate = useNavigate();
  const [uid, setUserName] = useState();
  const [password, setPassword] = useState();

   const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      uid : uid,
      password : password,
  }
  async function logincheck(){

    try{

        const response = await axios.post(`https://myphysio.digitaldarwin.in/api/login/`,data);
    
    if (response) {
        
        localStorage.setItem("token",JSON.stringify(response.data));
       
        if(response.data.role==="patient"){
            Navigate("/dashboard");
        }else{
            Navigate("/");
        }
        
      }

    }catch(e){
        alert(" Invalid username or password"+e);

    }
    
      
  }
  logincheck();
    

   }
   





  return (
  <div className='body'>
    <div className="container">

   
    <h2 className='head'>PHYSIOAI</h2>
    <h3>Welcome Back !</h3>
          <form onSubmit={handleSubmit}>

        <label>
          <p><span>*</span>Username </p>
          <input type="text"  onChange={e => setUserName(e.target.value)}/>
        </label>
        <br />
        <label>
          <p><span>*</span>Password</p>
          <input type="text" onChange={e => setPassword(e.target.value)} />
        </label>
        
        <div >
          <center>
          <button className='btn' type="submit">Submit</button>
          </center>
        </div>
      </form>
      </div>
  </div>
  )
}


export default Login;
