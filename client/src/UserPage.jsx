import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

 async function getUsers() {
    const response = await fetch("https://factsphere.onrender.com/users");
    const data = await response.json();
    setUsers(data);
  }

  async function handleShowUsers() {
    await getUsers();
    setShowUsers(true);
  }

  return (
    <div>
      <h1>Join Our Community</h1>
      <UserForm onUserAdded={() => getUsers()} />

      <button onClick={handleShowUsers}>Show Users</button>
      {showUsers && (
        <div>
        
          { users.map((user) => (
            <div key={user.id}>
              <h2>Fact provider :{user.username}</h2>
              <p>Email :{user.email}</p>
              <p>Explore the fascinating facts shared by {user.username}!</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
