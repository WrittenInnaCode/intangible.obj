import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Image, Container, Divider } from 'semantic-ui-react'

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

      {showTitle && <h1>{title}</h1>}

     
      {blogs && blogs.map((blog) => (

        <Container key={blog._id} style={{ marginTop: '3rem', marginBottom: '5rem' }}>

          <Divider style={{ marginTop: '3rem', marginBottom: '5rem' }} />

          <Link to={`/blog/${blog._id}`}>
            <h2 style={{ marginBottom: '2rem' }}>{blog.blogTitle}</h2>
          </Link>

          <Link to={`/blog/${blog._id}`}>
            <Image src={blog.blogImage} style={{ maxWidth: '500px', maxHeight: '400px' }} />
          </Link>

          <br />

          <Card.Meta>
            <p>Posted on {blog.createdAt}</p>
          </Card.Meta>

          {/* <p style={{ fontSize: '20px', paddingBottom: '0.5rem' }}>{blog.blogText}</p> */}

          <Link to={`/blog/${blog._id}`}>
            Comment on this blog post.
          </Link>

        </Container>

      ))}


    </div>
  );
};

export default BlogList;
