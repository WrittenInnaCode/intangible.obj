import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';

import BlogForm from '../../components/BlogForm';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { REMOVE_BLOG } from '../../utils/mutations';

import { Card, Button, Divider, Header, Grid, Image, Segment } from 'semantic-ui-react'

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

      <h1 style={{ marginBottom: '3rem' }}>Admin's Page</h1>

      <BlogForm />

      <Divider horizontal style={{ paddingTop: '6rem', marginBottom: '4rem' }}>
        <Header as='h3'>Your Blog Posts</Header>
      </Divider>

      <Grid stackable>
        <Grid.Row columns={3} >

          {user.blogs && user.blogs.map((blog) => (
            <Grid.Column >

              <Card key={blog._id} style={{ marginBottom: '4rem' }}>

                <Link to={`/blogs/${blog._id}`}>
                  <h2>{blog.blogTitle}</h2>
                </Link>

                <Card.Meta>{blog.createdAt}</Card.Meta>

                <Link to={`/blogs/${blog._id}`}>
                <Image src={blog.blogImage} />
                {/* <p style={{ fontSize: '20px', paddingBottom: '0.5rem' }}>{blog.blogText}</p> */}
                </Link>

                <Button inverted color='red' size='mini' type="click" onClick={() => handleOnClick(blog._id)} >Delete</Button>
                {/* <Button>Edit</Button> */}

              </Card>

            </Grid.Column>

          ))}

        </Grid.Row>
      </Grid>

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
