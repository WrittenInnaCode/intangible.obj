import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

import { QUERY_SINGLE_BLOG } from '../../utils/queries';
// import { REMOVE_BLOG } from '../../utils/mutations';

import { Button } from 'semantic-ui-react'

const SingleBlog = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { blogId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BLOG, {
    // pass URL parameter
    variables: { blogId: blogId },
  });

  // const [removeBlog] = useMutation(REMOVE_BLOG);

  // const handleOnClick = async (blogId) => {
  //     const { data } = await removeBlog({
  //       variables: { blogId },
  //     });
  //   }

  // const handleOnClick = () => {
  //   removeBlog({ variables: { blogId }});
  // }

  const blog = data?.blog || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div >

      <h3>
        {blog.blogAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          posted this blog on {blog.createdAt}
        </span>
      </h3>

      <div >
        <blockquote
           style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {blog.blogText}
        </blockquote>

        <Button 
        // onClick={handleOnClick} 
        type="click" inverted color='red' content='Delete' />

      </div>

      <div>
        <CommentList comments={blog.comments} />
      </div>

      <div style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm blogId={blog._id} />
      </div>
      
    </div>
  );
};

export default SingleBlog;
