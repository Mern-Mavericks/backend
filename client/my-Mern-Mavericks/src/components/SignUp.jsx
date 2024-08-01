import React, { useState } from "react";
import { signup } from "../../../../api/authApi";

const SignUp = () => {
  // State to manage form data for name, email, and password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State to manage message shown to user
  const [message, setMessage] = useState("");

  // Handler to update form data state when input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Handler to manage form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setMessage("All fields are required");
    }

    try {
      // API call to sign in the user with the provided credentials
      const res = await signup(formData);
      if (res.error) {
        setMessage(res.error);
      } else {
        setMessage("Successfully signed up!");
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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <button type="submit">Sign Up</button>
        {displayErrorMessage()}
      </form>
    </div>
  );
};

export default SignUp;
