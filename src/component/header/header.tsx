import { Link, Navigate, useNavigate } from 'react-router-dom';
import './header.css';
import { useCookies } from 'react-cookie';

export   function Header(){

    const[cookie,setCookie,removeCookie] = useCookies(["UserId","UserName","Role"]);
   const  navigate = useNavigate();

    function Singout(){
            navigate("/");
             removeCookie("UserId");
             removeCookie("UserName");
             removeCookie("Role");
            // <Navigate to="/" replace/>
    }

    return (
        <div className='header'>
           <h3 className='title p-2'><Link className='title text-decoration-none' to="/">Video Library</Link></h3>
            {
                  (cookie.Role==="ADMIN" || cookie.Role === "USER") ?
                  
                 <div className="input-group mb-3 w-25">
  <input type="text" className="form-control" placeholder="Enter Keyword" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <span className="input-group-text" id="basic-addon2"><i className="bi bi-search"></i></span>
</div>
                  
                  :''
            }
           <div className='d-flex align-items-center'>
           

            {
                (cookie.Role==="ADMIN") ?
                <Link className='btn btn-primary text-light me-3' to="/admin"><i className="bi bi-houses me-2"></i>Home</Link> :
                (cookie.Role === "USER") ?
                 <Link className='btn btn-primary text-light me-3' to="/user-lib"><i className="bi bi-houses me-2"></i>Home</Link> :
                     <Link className='btn btn-primary text-light me-3' to="/"><i className="bi bi-houses me-2"></i>Home</Link> 
            }
            
              
             {
                 (cookie.UserId && cookie.UserName )  ? 
                 <div className='d-flex'>
                    {
                        (cookie.Role==='ADMIN')  ? 
                        <Link className='btn btn-dark text-light me-3' to="/admin/admin-dashboard"><i className="bi bi-speedometer me-2"></i>Dashboard</Link> 
                        :
                        ''
                    }
                     <button onClick={Singout} className='btn btn-warning me-2'><i className="bi bi-box-arrow-left me-2"></i>Singout</button>
                    </div>
                 
                 : 
                 
                 <div className='d-flex'>
                     

                  <div className="dropdown me-3">
                <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Login
                </button>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link className='dropdown-item text-center' to="/login">Login</Link></li>
                <li> <Link className='dropdown-item text-center' to="">Dashboard</Link></li>
                </ul>
                </div>

                 <div className="dropdown">
                <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Register
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li> <Link className='dropdown-item text-center' to="/admin-register">Admin Register</Link></li>
                <li><Link className='dropdown-item text-center' to="/user-register">User Register</Link></li>
                </ul>
                </div>
                 
                  </div>
                
             }

            


           </div>

        </div>
    )
}