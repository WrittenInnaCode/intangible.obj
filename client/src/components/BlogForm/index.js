import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Button, Form, Input, TextArea, Grid } from 'semantic-ui-react'


const BlogForm = () => {
  const [blogText, setBlogText] = useState('');
  // const [blogTitle, setBlogTitle] = useState('');

  const [addBlog, { error }] = useMutation(ADD_BLOG, {
    update(cache, { data: { addBlog } }) {
      try {
        const { blogs } = cache.readQuery({ query: QUERY_BLOGS });

        cache.writeQuery({
          query: QUERY_BLOGS,
          data: { blogs: [addBlog, ...blogs] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, blogs: [...me.blogs, addBlog] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBlog({
        variables: {
          blogText,
          // blogTitle,
          blogAuthor: Auth.getProfile().data.username,
        },
      });

      setBlogText('');
      // setBlogTitle('');
    } catch (err) {
      console.error(err);
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'blogText') {
      setBlogText(value);
    }
  };

  return (
    <div>
      <h3>Create a new blog post</h3>

      {Auth.loggedIn() ? (
        <>
         
          <Form onSubmit={handleFormSubmit}>
            <Grid.Column>
            {/* <Input fluid
                name="blogTitle"
                placeholder="Blog Title"
                value={blogTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></Input> */}
              <TextArea
                name="blogText"
                placeholder="New blog post text"
                value={blogText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></TextArea>
            </Grid.Column>

            <Grid.Column>
              <Button type="submit">
                Add a Blog Post
              </Button>
            </Grid.Column>
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to add a blog post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BlogForm;
