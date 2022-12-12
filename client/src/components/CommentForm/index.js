import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { Button, Form, TextArea, Grid } from 'semantic-ui-react'


const CommentForm = ({ blogId }) => {
  const [commentText, setCommentText] = useState('');

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          blogId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this blog post?</h4>

      {Auth.loggedIn() ? (
        <>

          <Form onSubmit={handleFormSubmit}>

            <Grid.Column>
              <TextArea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></TextArea>
            </Grid.Column>

            <Grid.Column>
              <Button type="submit">
                Add Comment
              </Button>
            </Grid.Column>

          </Form>

        </>
      ) : (
        <p>
          You need to be logged in to comment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
