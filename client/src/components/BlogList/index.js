import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'semantic-ui-react'

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
      {showTitle && <h3>{title}</h3>}
      {blogs &&
        blogs.map((blog) => (

          <Card key={blog._id}>

            <h4>
              {showUsername
                ? (
                  <Link to={`/profiles/${blog.blogAuthor}`}>
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
            </h4>


            <div>
              <p>{blog.blogText}</p>
            </div>

            <Link to={`/blogs/${blog._id}`}>
              Join the discussion on this blog post.
            </Link>
            
          </Card>
        ))}
    </div>
  );
};

export default BlogList;
