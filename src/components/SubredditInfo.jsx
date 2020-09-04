import React from 'react';

/**
 * Displays subreddit info
 * 
 * @param props.info - subreddit info returned by `RedditClient`
 */
export default function SubredditInfo({ info }) {
  return <div>
    <h3>Info:</h3>
    <p>Subreddit Title: {info.title}</p>
    <p>Description: {info.description}</p>
    <p>Display Name Prefixed: {info.name}</p>
    <p>Subscribers: {info.subscribers.toLocaleString()}</p>
  </div>
}