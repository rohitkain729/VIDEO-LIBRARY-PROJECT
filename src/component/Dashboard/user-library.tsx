import { useEffect, useState } from "react";
import "./user-library.css";
import axios from "axios";
import { Sidebar } from "../sidebar/sidebar";
import { Link, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";


export function UserLibrary(){

    // const[cookie] = useCookies(["UserId","UserName","Role"]);

   
    return (
        <div className="user-container">

          <div className="row p-3">
        <div className="col-2 "> <Sidebar/></div>

        <div className=" col-10  video-lib ">
            <Outlet/>
          </div>
        </div>
        </div>
    )
}