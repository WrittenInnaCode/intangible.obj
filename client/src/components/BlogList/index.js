import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Button } from 'semantic-ui-react'

const BlogList = ({
  blogs,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!blogs.length) {
    return <h3>No Blog Posts Yet</h3>;
  }

  return (
    <div>

      {/* BLOG POSTS PAGE */}

      {showTitle && <h3>{title}</h3>}

      {blogs && blogs.map((blog) => (

        <Card key={blog._id} style={{ padding: '0.5rem' }}>


          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.blogTitle}</h2>
          </Link>

          <p>{blog.blogAuthor}, {blog.createdAt}</p>

          <img style={{ maxWidth: '300px', padding: '0.5rem' }}>{blog.blogImage}</img>

          {/* <h4>
            {showUsername
              ? (
                <Link to={`/blogs/${blog._id}`}>
                  {blog.blogAuthor}
                  <br />
                  <span style={{ fontSize: '1rem' }}>
                    created this blog post on {blog.createdAt}
                  </span>
                </Link>)
              : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You created this blog post on {blog.createdAt}
                  </span>
                </>
              )}
          </h4> */}

          <p style={{ fontSize: '20px', paddingBottom: '0.5rem' }}>{blog.blogText}</p>

          <Link to={`/blogs/${blog._id}`}>
            Comment on this blog post.
          </Link>

        </Card>
      ))}
    </div>
  );
};

export default BlogList;
