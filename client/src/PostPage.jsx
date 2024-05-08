import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import "./PostPage.css";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await fetch("https://factsphere.onrender.com/posts");
    const data = await response.json();
    setPosts(data);
  }

  function handleShowPosts() {
    setShowPosts(true);
  }

  return (
    <div className="PostPage">
      <h1>Explore Facts</h1>
      <PostForm />
      <button onClick={handleShowPosts}>Show Facts</button>
      {showPosts && (
        <div>
          <PostForm />
          {posts.map((post, index) => (
            <div key={index}>
              <h2>Fact Title :{post.title}</h2>
              <p> Fact:{post.content}</p>
              <a href={post.link} target="_blank">Source of the fact</a> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
