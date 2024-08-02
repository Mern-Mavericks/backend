import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/NavBar";
import { AuthProvider } from "../../../context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Add the Navbar component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
