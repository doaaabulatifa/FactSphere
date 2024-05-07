import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserPage from "./UserPage";
import PostPage from "./PostPage";
import  "./MainPage.css"
import logo from "./facts-2.jpg"; 


function Home() {
  return (
    <div>
      <h2>Welcome to FactSphere!</h2>
      <p>Explore fascinating facts shared by our community or join us to start sharing your own.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="MainPage">
      <h1>FactSphere</h1>
      <BrowserRouter>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/posts" className="nav-link">Posts</Link>
        </nav>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
   
      </BrowserRouter>
      <img src={logo} alt="FactSphere" className="logo" />
   
    </div>
  );
}
