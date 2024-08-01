import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../../api/authApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await getAllUsers();
        if (result.error) {
          setError(result.error);
        } else {
          setUsers(result);
        }
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchAllUsers();
  }, []);

  const displayErrorMessage = () => {
    if (error) {
      return <p>{error}</p>;
    }
    return null;
  };

  return (
    <div>
      <h2>All Users</h2>
      {displayErrorMessage()}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
