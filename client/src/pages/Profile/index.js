import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';

import BlogForm from '../../components/BlogForm';
// import BlogList from '../../components/BlogList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { REMOVE_BLOG } from '../../utils/mutations';

import { Card, Button } from 'semantic-ui-react'

import Auth from '../../utils/auth';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};


  const [removeBlog, { error }] = useMutation(REMOVE_BLOG);

  const handleOnClick = async (blogId) => {
    const { data } = await removeBlog({
      variables: { blogId },
    });
    window.location.reload()
  }


  // navigate to personal profile page if you are the admin
  if (Auth.loggedIn() && Auth.getProfile().data.username === "writteninnacode") {

    return <div>

      <h1>Admin's Page</h1>

      <BlogForm />

      <div >

        {user.blogs && user.blogs.map((blog) => (

          <Card key={blog._id} style={{ padding: '0.5rem' }}>

            <Link to={`/blogs/${blog._id}`}>
              <h2>{blog.blogTitle}</h2>
            </Link>

            <p>{blog.blogAuthor}, {blog.createdAt}</p>
            
            <img src={blog.blogImage} style={{ maxWidth: '300px', padding: '0.5rem' }} />
            <p style={{ fontSize: '20px', paddingBottom: '0.5rem' }}>{blog.blogText}</p>

            {/* <Link to={`/blogs/${blog._id}`}>
              Comment on this blog post.
            </Link> */}

            <Button.Group>
              <Button type="click" onClick={() => handleOnClick(blog._id)}>Delete</Button>
              {/* <Button>Edit</Button> */}
            </Button.Group>

          </Card>

          // <Card key={blog._id}>

          //   <h3>
          //     <Link to={`/blogs/${blog._id}`}>
          //       {blog.blogAuthor}
          //       <br />
          //       <span style={{ fontSize: '1rem' }}>
          //         created this blog post on {blog.createdAt}
          //       </span>
          //     </Link>
          //   </h3>

          //   <h4>{blog.blogTitle}</h4>

          //   <div>
          //     <p>{blog.blogText}</p>
          //   </div>

          //   <Link to={`/blogs/${blog._id}`}>
          //     Comment on this blog post.
          //   </Link>
          //   <Button.Group>
          //     <Button type="click" onClick={() => handleOnClick (blog._id)}>Delete</Button>
          //     <Button>Edit</Button>
          //   </Button.Group>

          // </Card>
        ))}
      </div>
    </div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

};

export default Profile;
