"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

//We create the component just here, because we only use it here:
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-9 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

//The actual Feed component:
const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {};

  // FETCH PROMPTS FROM DATABASE:

  const [posts, setPosts] = useState([]);

  console.log(posts);

  const fetchPosts = async () => {
    const response = await fetch("api/prompt");
    const data = await response.json();
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, prompt, or user"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
