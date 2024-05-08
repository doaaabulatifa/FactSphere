import React, { useState, useEffect } from "react";

export default function PostForm() {
  const [post, setPost] = useState({ title: "", content: "", link: "", category_id: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await fetch("https://factsphere.onrender.com/categories");
    const data = await response.json();
    setCategories(data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://factsphere.onrender.com/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          setPost({ title: "", content: "", link: "", category_id: "" });
        }
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add your Fact</h1>
      <input name="title" placeholder="Add a title" value={post.title} onChange={handleChange} />
      <textarea name="content" placeholder="Add your fact" value={post.content} onChange={handleChange} />
      <input name="link" placeholder="Prove it by a link" value={post.link} onChange={handleChange} />
      <select name="category_id" value={post.category_id} onChange={handleChange}>
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button>Share</button>
    </form>
  );
}
