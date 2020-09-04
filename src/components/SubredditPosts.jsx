import React from 'react';

/**
 * Displays subreddit's posts
 * 
 * @param props.posts - posts returned by `RedditClient`
 */
export default function SubredditPosts({ posts }) {
  return <div>
    <h3>Posts:</h3>
    { posts.map(post => <>
      <div key="post.title">
        <p>Title: {post.title}</p>
        <p>Score: {post.score}</p>
        <p>Subscribers: {post.subredditSubscribers.toLocaleString()}</p>
        <p>{post.numComments > 0 ?
          `# Comments: ${post.numComments.toLocaleString()}` :
          "No comments"}
        </p>
      </div>
    </>)}
  </div>
}