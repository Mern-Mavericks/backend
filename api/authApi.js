// API call to backend to handle user signups
export const signup = async (user) => {
  const response = await fetch(`/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// API call to backend to handle user sign-in authentication
export const signin = async (user) => {
  const response = await fetch(`/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// API call to backend to sign out user
export const signout = async () => {
  const response = await fetch(`/auth/signout`, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// API call to the backend to retrieve all registered users
export const getAllUsers = async () => {
  const response = await fetch(`/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
