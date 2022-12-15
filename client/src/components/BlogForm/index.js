import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Button, Form, TextArea, Grid, Icon } from 'semantic-ui-react'
// import axios from 'axios';


const BlogForm = () => {
  const [blogText, setBlogText] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [images, setImages] = useState([]);
  // const [imageToRemove, setImageToRemove] = useState('');


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


  // function handleRemoveImg(imgObj) {
  //   setImageToRemove(imgObj.public_id);
  //   axios.delete(`http://localhost:8080/${imgObj.public_id}`)
  //     .then(() => {
  //       setImageToRemove(null);
  //       setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
  //     })
  //     .catch((err) => console.log(err));
  // }



  function handleOpenWidget(event) {
    event.preventDefault()
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbudwdvhb',
      uploadPreset: 'd9fw2ton'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
      }
    });
    myWidget.open();
  }



  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBlog({
        variables: {
          blogText,
          blogTitle,
          blogImage,
          blogAuthor: Auth.getProfile().data.username,
        },
      });

      setBlogText('');
      setBlogTitle('');
      setBlogImage('')
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
    } else if (name === 'blogImage') {
      setBlogImage(value);
    };


  };

  return (
    <div>
      <h3>Create a new blog post</h3>

      {Auth.loggedIn() ? (
        <>

          <Form onSubmit={handleFormSubmit} style={{ marginBottom: '3rem' }}>
            <Grid.Column>
              <input fluid
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
              <Button onClick={handleOpenWidget}>Upload Picture</Button>

              {/* <div>
                value={blogImage}
                name="blogImage"
                onChange={handleChange}
              </div> */}

              <div className='imgPreview-container'>

                {images.map((image) => (
                  <div>
                    <img
                      src={image.url}
                      className='imgPreview'
                    />
                    {/* {imageToRemove != image.public_id && <Icon className='close closeIcon' circular color='pink' onClick={() => handleRemoveImg(image)} />} */}
                  </div>
                ))}

              </div>


              <div><br /></div>
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
