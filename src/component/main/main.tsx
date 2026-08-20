import { useCookies } from 'react-cookie';
import './main.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Main(){


    // const[cookie]=useCookies(["UserId","UserName","Role"]);
    // const navigate = useNavigate();
    // useEffect(()=>{
    //  console.log(cookie.UserId);
    //  console.log(cookie.Role);
    // if(!cookie.UserId || !cookie.Role){
    //   navigate("/");
    // }
    // },[cookie.UserId,cookie.Role,navigate])
    
    return (
        <div className="main">
            <img src="/images/netflix.jpg" width="100%" height="100%" alt="netflix image" />
            <div className='h2 m-3 text-danger fw-bold text-center  movie'>Latest UpComming Movies</div>
           
            <img src="/images/movie/m1.png" alt=""  />
            <img src="/images/movie/m2.png" alt=""  />
            <img src="/images/movie/m3.png" alt=""  />
            <img src="/images/movie/m4.png" alt=""  />
            <img src="/images/movie/m5.png" alt=""  />
            <img src="/images/movie/m6.png" alt=""  />
            <img src="/images/movie/m7.png" alt=""  />
            <img src="/images/movie/m8.png" alt=""  />
            <img src="/images/movie/m9.png" alt=""  />
            <img src="/images/movie/m10.png" alt=""  />       
          
        </div>
    )
}