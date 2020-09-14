import React, { useState } from "react";
import { fetchPosts, fetchInfo, parseSubredditId } from "./api/RedditClient";
import SubredditPosts from "./components/SubredditPosts";
import SubredditInfo from "./components/SubredditInfo";
import Loader from "./components/Loader";
import "./App.css";

export default function App() {
  // Holds the data from api responses
  const [data, setData] = useState({
    posts: null,
    info: null,
  });

  const [loading, setLoading] = useState(false);

  function search(input) {
    setLoading(true);
    setData({
      posts: null,
      info: null,
    });

    fetchPosts(input)
      .then((posts) => {
        const subredditId = parseSubredditId(posts);

        return Promise.all([posts, fetchInfo(subredditId)]);
      })
      .then((data) => {
        const [posts, info] = data;

        setData({
          posts,
          info,
        });

        setLoading(false);
      });
  }

  function handleJavaScriptSearch(e) {
    e.preventDefault();
    search("javascript");
  }

  function handleJavaSearch(e) {
    e.preventDefault();
    search("java");
  }

  function handleCatsSearch(e) {
    e.preventDefault();
    search("cats");
  }

  return (
    <div className="App">
      <form>
        <button type="button" onClick={handleJavaScriptSearch}>
          r/javascript
        </button>
        <button type="button" onClick={handleJavaSearch}>
          r/java
        </button>
        <button type="button" onClick={handleCatsSearch}>
          r/cats
        </button>
      </form>
      {data.info && <SubredditInfo info={data.info} />}
      <br />
      <br />
      {data.posts && <SubredditPosts posts={data.posts} />}
      {loading && <Loader />}
    </div>
  );
}
