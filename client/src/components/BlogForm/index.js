import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Editor } from '@tinymce/tinymce-react';

import { Segment, Button, Form, Grid, Message, Image, Icon} from 'semantic-ui-react'


const BlogForm = ({ blogItem = {}, edit, blogId, refetch }) => {

  const navigate = useNavigate();

  const [blogText, setBlogText] = useState(blogItem.blogText || '');
  const [blogTitle, setBlogTitle] = useState(blogItem.blogTitle || '');
  const [blogImage, setBlogImage] = useState([]);
  const [imageURL, setImageURL] = useState(blogItem.blogImage || '');

  const apiKey = '4m49w4kxra2wj9gl67rbos34wxi5nanvf8g83nne9o8gp67b';

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


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

    try {
      if (edit) {
        const { data } = await edit({
          variables: {
            blogId,
            blogText,
            blogTitle,
            blogImage: imageURL,
          },
        });
        window.location.assign('/me');

      } else {
        const { data } = await addBlog({
          variables: {
            blogText,
            blogTitle,
            blogImage: imageURL,
            blogAuthor: Auth.getProfile().data.username,
          },
        });

        setBlogText('');
        setBlogTitle('');

        refetch();
        window.location.reload();
      }
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

  const handleUpdate = (blogText, editor) => {
    setBlogText(blogText);
  };

  return (
    <div>

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

                  <Editor
                    name="blogText"
                    placeholder="New blog post text"
                    apiKey={apiKey}
                    value={blogText}
                    onEditorChange={handleUpdate}
                    onChange={handleChange}
                    onInit={(evt, editor) => editorRef.current = editor}

                    init={{
                      height: 300,
                      menubar: false,

                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />

                </Grid.Column>

                <Grid.Column>

                  <br />
                  <Button onClick={handleOpenWidget} basic color='blue'><Icon name='images' />Upload Picture</Button>


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

                <Button type="submit" basic color='teal'><Icon name='check' />
                  {edit ? "Update" : "Add"} a Blog Post
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
