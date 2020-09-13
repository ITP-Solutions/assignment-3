import React from 'react';
import './App.css';

import { fetchPosts, fetchInfo, parseSubredditId } from './api/RedditClient';
import SubredditPosts from './components/SubredditPosts.jsx';
import SubredditInfo from './components/SubredditInfo.jsx';
import Loader from './components/Loader.jsx';

function App() {
  // Holds the data from api responses
  const [data, setData] = React.useState({
    posts: null,
    info: null
  });

  // Whether or not error message should be displayed
  const [showError, setShowError] = React.useState(false);

  // Whether or not page is loading
  const [loading, setLoading] = React.useState(false);

  // Last user submission
  const [input, setInput] = React.useState('');

  // Bind the `handleSubmit` function to changes in the
  // input state
  React.useEffect(handleSubmit, [loading]);

  /**
   * Handles api calls/side effects from user submitting
   * form
   */
  function handleSubmit() {
    if (showError) setShowError(false);
    if (input === '') return;
    setData({
      posts: null,
      info: null
    });
    let posts;
    fetchPosts(input)
      .then(res => {
        posts = res;
        return parseSubredditId(res);
      })
      .then(id => fetchInfo(id))
      .then(info => {
        setData({
          posts,
          info
        })
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setShowError(true);
      });
  }

  /**
   * Submit callback for form
   *
   * @param e - event object from action
   */
  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
  }

  /**
   * Given an input change, update the `input` state
   *
   * @param e - event target object
   */
  function onInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <p>Enter a subreddit:</p>
        <input type="text" id="subreddit-input" onChange={onInputChange}/>
        <button type="submit"> Submit</button>
      </form>
      {data.info && <SubredditInfo info={data.info}/>}
      <br/><br/>
      {data.posts && <SubredditPosts posts={data.posts}/>}
      {showError && <p>Error loading that subreddit</p>}
      <Loader active={loading}/>
    </div>
  );
}

export default App;
