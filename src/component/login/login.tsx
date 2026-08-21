import { useFormik } from "formik";
import { Login } from "../../contract/login";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./login.css";

export function LoginForm(){

  const navigate = useNavigate();
  const[userdetails,setUserDetails] = useState([{UserId:'',Password:'',UserName:'',Role:''}]);
  const[admindetails,setAdminDetails] = useState([{UserId:'',Password:'',UserName:'',Role:''}]);
  

  const [role,SetRole] = useState(""); 

  const[message,setMessage] = useState("");

  const[cookie,setCookie,removeCookie] = useCookies(["UserId","UserName","Role"]);

  const[isActive,setIsActive] = useState(true);


  useEffect( ()=>{
  const getUsers = async ()=>{
    await axios.get("http://localhost:4000/users").then(res=>setUserDetails(res.data)).catch((err)=>{setMessage(err.message)});
    await axios.get("http://localhost:4000/admin").then(res=>setAdminDetails(res.data)).catch((err)=>{setMessage(err.message)});
  } 
  getUsers();
  });

  const loginformik = useFormik<Login>({
     initialValues: {
       UserId: '',
       Password:'',
       Role:''
     },


     onSubmit: (FormData) => {
  
      if(FormData.Role === "ADMIN"){
         if(FormData.UserId === admindetails[0].UserId){
             
            if(FormData.Password === admindetails[0].Password){
            
                setIsActive(false);
                setMessage("Valid Credential");
                setCookie("UserId",admindetails[0].UserId);
                setCookie("UserName",admindetails[0].UserName);
                setCookie("Role",admindetails[0].Role);
                setTimeout(()=>{
                navigate("/admin");
              },2000);
            }else{
              setIsActive(false);
               setMessage("In Valid Password Credential");
            }

            
        }else{
               setIsActive(false);
               setMessage("In Valid UserId Credential");
        }
      }
      else if(FormData.Role === "USER"){
           if(FormData.UserId === userdetails[0].UserId){
           if(FormData.Password === userdetails[0].Password){
            
               setIsActive(false);
               setMessage("Valid Credential");
               setCookie("UserId",userdetails[0].UserId);
               setCookie("UserName",userdetails[0].UserName);
               setCookie("Role",userdetails[0].Role);
                setTimeout(()=>{
                navigate("/user-lib");
              },2000);
          }else{
               setIsActive(false);
               setMessage("In Valid Password Credential");
          }

        }else{
         setIsActive(false);
         setMessage("In Valid UserId Credential");
        }

      }else{
        setIsActive(false);
        setMessage("Invalid Credentials");
      }
    }  
    ,
   });
    return (
        <div className="container d-flex flex-column w-25 bg-light p-4 rounded-3 loginform">
          <div className={`alert alert-danger ${isActive  ? "d-none " : "d-block "} `} role="alert">
         {message}
          </div>
          <h3 className="m-2 text-black fw-bold">Please Login</h3>
          <form onSubmit={loginformik.handleSubmit}>
          <dl>
            <dt className="form-label">UserId</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={loginformik.handleChange}
         onBlur={loginformik.handleBlur}
         value={loginformik.values.UserId}
         /> </dd>
            <dt className="form-label">Password</dt>
            <dd> <input type="password" className="form-control" id="Password"
         name="Password"
         onChange={loginformik.handleChange}
         onBlur={loginformik.handleBlur}
         value={loginformik.values.Password}
         /> </dd>
         <dt>Please Select Role</dt>
         <dd className="mt-2">
          <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" value="ADMIN"  onChange={loginformik.handleChange} checked={loginformik.values.Role === "ADMIN"}  name="Role"/>
          <label className="form-check-label">ADMIN</label>
         </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="USER"  onChange={loginformik.handleChange}  checked={loginformik.values.Role === "USER"}  name="Role"/>
            <label className="form-check-label">USER</label>
          </div>
         </dd>
          </dl>
          <button type="submit" className="btn btn-success">Login</button>
          </form>
          
        </div>
      
    );
}