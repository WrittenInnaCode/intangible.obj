import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Segment, Button, Form, TextArea, Grid, Message, Image, Icon, Divider, Header } from 'semantic-ui-react'


const BlogForm = () => {
  const [blogText, setBlogText] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState([]);
  const [imageURL, setImageURL] = useState('');


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

  // solves problem of state not being set by re-rendering the page (setImageURL(result.info.url) line 57)
  useEffect(() => { })

  function handleOpenWidget(event) {
    event.preventDefault()
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbudwdvhb',
      uploadPreset: 'd9fw2ton'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        setBlogImage((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
        setImageURL(result.info.url)
      }
    });
    myWidget.open();
  }



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("url ", blogImage.url)
    try {
      const { data } = await addBlog({
        variables: {
          blogText,
          blogTitle,
          // blogImage: blogImage.url,
          blogImage: imageURL,
          blogAuthor: Auth.getProfile().data.username,
        },
      });

      setBlogText('');
      setBlogTitle('');
      window.location.reload();
    } catch (err) {
      console.error(err);
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'blogText') {
      setBlogText(value);
    } else if (name === 'blogTitle') {
      setBlogTitle(value);
    };


  };

  return (
    <div>

      <Divider horizontal style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Header as='h3'>
          Create a new blog post
        </Header>
      </Divider>

      {Auth.loggedIn() ? (
        <>

          <Form onSubmit={handleFormSubmit} className='blogForm'>
            <Segment.Group>
              <Segment secondary>
                <Grid.Column>
                  <input
                    name="blogTitle"
                    placeholder="Blog Title"
                    value={blogTitle}
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                  ></input>
                  <div><br /></div>
                  <TextArea
                    name="blogText"
                    placeholder="New blog post text"
                    value={blogText}
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                  ></TextArea>
                </Grid.Column>

                <Grid.Column>

                  <br />
                  <Button onClick={handleOpenWidget} basic color='blue'><Icon disabled name='images' />Upload Picture</Button>


                  <div className='imgPreview-container'>

                    {blogImage.map((image) => (
                      <div>
                        <Image
                          src={image.url}
                          className='imgPreview'
                          rounded
                          centered
                        />

                      </div>
                    ))}

                  </div>

                </Grid.Column>

              </Segment>


              <Segment secondary>
                <Button type="submit" basic color='violet'><Icon disabled name='check' />
                  Add a Blog Post
                </Button>
              </Segment>

            </Segment.Group>

          </Form>

          {error && (
            <Message warning attached='bottom'>
              {error.message}
            </Message>
          )}

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
