import React, { useState } from "react";
import { signin } from "../../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";

const SignIn = () => {
  // State to manage form data for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // State to manage message shown to user
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handler to update form data state when input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler to manage form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setMessage("All fields are required");
    }

    try {
      // API call to sign in the user with the provided credentials
      const res = await signin(formData);
      if (res.error) {
        setMessage(res.error);
      } else {
        setMessage("Successfully signed in!");
        localStorage.setItem("token", res.token);
        login(); // Call the login function from auth context to update the state
        navigate("/");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const displayErrorMessage = () => {
    if (message) {
      return <p>{message}</p>;
    }
    return null;
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
        {displayErrorMessage()}
      </form>
    </div>
  );
};

export default SignIn;
