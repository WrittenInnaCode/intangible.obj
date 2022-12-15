import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react'

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

        <Card key={blog._id} >

          <Link to={`/blogs/${blog._id}`}>
            <Card.Header className='cardHeader'>{blog.blogTitle}</Card.Header>

            <Image src={blog.blogImage} />
          </Link>

          <br />

            <Card.Meta>
              <span>{blog.createdAt}</span>
            </Card.Meta>


            {/* <p style={{ fontSize: '20px', paddingBottom: '0.5rem' }}>{blog.blogText}</p> */}

            <Link to={`/blogs/${blog._id}`}>
              Comment on this blog post.
            </Link>
            

        </Card>
      ))}
    </div>
  );
};

export default BlogList;
