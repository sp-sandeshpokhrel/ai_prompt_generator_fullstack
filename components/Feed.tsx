"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type FeedProps = {};
type PromptListProps = {
  data: any[];
  handleTagClick: (tag: string) => void;
};
const PromptCardList: React.FC<PromptListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
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

const Feed: React.FC<FeedProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e: Event) => {
    setSearchText(e.target.value);
    let filteredPosts;
    if (searchText[0] !== "#") {
      filteredPosts = allPosts.filter((post) =>
        post.prompt.toLowerCase().includes(searchText)
      );
    } else {
      filteredPosts = allPosts.filter((post) =>
        post.tag.toLowerCase().includes(searchText)
      );
    }
    setPosts(filteredPosts);
  };
  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    let filteredPosts;

    filteredPosts = allPosts.filter((post) =>
      post.tag.toLowerCase().includes(searchText)
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setAllPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
