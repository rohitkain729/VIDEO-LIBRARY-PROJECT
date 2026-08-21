import { useParams } from "react-router-dom";
import "./home.css";
import { useCookies } from "react-cookie";

export function HomePage(){


    const[cookie] = useCookies(["UserId","UserName"]);


    return(
        <div className="home">
        <div className="home">user</div>
        <div className="home">{cookie.UserId}</div>
        <div className="home">{cookie.UserName}</div>
        </div>   
    );
}