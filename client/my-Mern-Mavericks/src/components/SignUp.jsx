import React, { useState } from "react";
import { signup } from "../../../../api/authApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      const res = await signup(formData);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage("Successfully signed up!");
      }
    } catch (err) {
      setErrorMessage("Error signing up, please try again");
    }
  };

  const displayErrorMessage = () => {
    if (errorMessage) {
      return <p>{errorMessage}</p>;
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
