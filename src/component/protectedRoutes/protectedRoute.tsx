import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: string;
}

 export function ProtectedRoute({children,role}:ProtectedRouteProps){
    
    const[cookie] = useCookies(["UserId","UserName","Role"]);

    // const navigate = useNavigate();

    if(!cookie.UserId || !cookie.Role){
      return  <Navigate to="/" replace />
    }

    
    if(!cookie.UserId || !cookie.Role || !cookie.Role){
      return  <Navigate to="/" replace />
    }

    if(role && cookie.Role !== role){
            return <Navigate to="/" replace />    
    }

    return <>{children}</>;
 }