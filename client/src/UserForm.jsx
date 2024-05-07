import React, { useState } from "react";
import "./UserForm.css"

export default function UserForm({ onUserAdded }) {
  const [form, setForm] = useState({ username: "", email: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      setForm({ username: "", email: "" });
      onUserAdded(); 
    }
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new user</h1>
      <input name="username" placeholder="username" value={form.username} onChange={handleChange} />
      <input name="email" placeholder="email" type="text" value={form.email} onChange={handleChange} />
  
      <button>Join</button>
    </form>
  );
}
