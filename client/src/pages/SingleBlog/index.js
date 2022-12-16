import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

import { QUERY_SINGLE_BLOG } from '../../utils/queries';

import { Segment, Button, Form, Grid, Message, Image, Icon, Divider, Header } from 'semantic-ui-react'

const SingleBlog = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { blogId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BLOG, {
    // pass URL parameter
    variables: { blogId: blogId },
  });


  const blog = data?.blog || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div >
      <h1 style={{ fontStyle: 'italic' }}>{blog.blogTitle}</h1>

      <Image src={blog.blogImage} style={{ maxWidth: '500px', marginBottom: '4rem', marginTop: '4rem' }} centered />

      <div >
        {/* <blockquote
          style={{
            fontSize: '1.5rem',
            border: '2px',
            lineHeight: '1.5',
          }}
        >
          {blog.blogText}
        </blockquote> */}
      </div>

      <div style={{
            fontSize: '1.5rem',
            border: '2px',
            lineHeight: '1.5',
          }} 
          dangerouslySetInnerHTML={{ __html:blog.blogText}} />

      <h3 style={{ fontSize: '1rem', paddingBottom: '2rem' }}>
        {blog.blogAuthor} {''}
        <span> posted on {blog.createdAt} </span>
      </h3>

      <br />

      <Divider horizontal style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Header as='h3'> Comments </Header>
      </Divider>

      <div>
        <CommentList comments={blog.comments} />
      </div>

      <br />

      <div style={{ border: '' }}>
        <CommentForm blogId={blog._id} />
      </div>

    </div>
  );
};

export default SingleBlog;
