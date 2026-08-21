import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "./component/sidebar/sidebar";
import { Header } from "./component/header/header";
import { Footer } from "./component/footer/footer";
import { Main } from "./component/main/main";
import { LoginForm } from "./component/login/login";
import { AdminRegisterForm } from "./component/register/admin-register";
import { UserRegisterForm } from "./component/register/user-register";
import { HomePage } from "./component/home/home";
import {  AdminLibrary } from "./component/Dashboard/admin-library";
import { AdminDashboard } from "./component/Dashboard/admin-dashboard";
import { UserLibrary } from "./component/Dashboard/user-library";
import { ProtectedRoute } from "./component/protectedRoutes/protectedRoute";
import { ErrorPage } from "./component/error/errorpage";
import { CommentPage } from "./component/comments/comments";
import { VideoLib } from "./component/Dashboard/dash-components/video-lib/video-lib";

function App() {

  return (
    <BrowserRouter>
      <div className="basic-layout">
        <div className="sidebar">{<Sidebar />}</div>
        <div className="content">
          <div>{<Header />}</div>
          <div className="middle">
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/admin-register" element={<AdminRegisterForm />}></Route>
              <Route path="/user-register" element={<UserRegisterForm />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
              
            {/* ADMIN routes */}
              <Route path="/admin" element={
              <ProtectedRoute role="ADMIN">
                <AdminLibrary />
              </ProtectedRoute>
              }></Route>

              <Route path="/admin/admin-dashboard" element={
                <ProtectedRoute role="ADMIN"><AdminDashboard/></ProtectedRoute>
              }></Route>
              
              <Route path="/user-lib" element={<ProtectedRoute role="USER"><UserLibrary/></ProtectedRoute>}>
              {/* User component     path="/user-comments/:UserId/:UserName/:VideoId"*/}
              <Route index  element={<VideoLib/>}></Route>
              {/* comments component */}
              <Route path="user-comments/:UserId/:UserName/:VideoId" element={<CommentPage/>}></Route>
              </Route>

            
            </Routes>
          </div>
          <div className="footer-main mt-3">{<Footer />}</div>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
