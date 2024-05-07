import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

 async function getUsers() {
    const response = await fetch("http://localhost:8080/users");
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
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <p>Explore the fascinating facts shared by {user.username}!</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
