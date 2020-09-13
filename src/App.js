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
  React.useEffect(handleSubmit, [input]);

  /**
   * Handles api calls/side effects from user submitting
   * form
   */
  function handleSubmit() {
    if (showError) setShowError(false);
    if (input === '') return;
    setLoading(true);
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
   * Submit callback for subreddit. Returns function to
   * set input state based on given subreddit from button
   * triggered event
   *
   * @param subreddit - the subreddit to look up
   * @return function with event object as param
   */
  function onSubmit(subreddit) {
    return function(e) {
      e.preventDefault();
      setInput(subreddit);
    }
  }

  return (
    <div className="App">
      <form>
        <button type="button" onClick={onSubmit("javascript")}>r/javascript</button>
        <button type="button" onClick={onSubmit("java")}>r/java</button>
        <button type="button" onClick={onSubmit("cats")}>r/cats</button>
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
