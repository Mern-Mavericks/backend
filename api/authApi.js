const API_URL = "http://localhost:3000/api";

export const signup = async (user) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signin = async (user) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signout = async () => {
  const response = await fetch(`${API_URL}/signout`, {
    method: "GET",
  });
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};
