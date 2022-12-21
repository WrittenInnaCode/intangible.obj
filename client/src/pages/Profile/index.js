import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';

import BlogForm from '../../components/BlogForm';

import Login from '../Login';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { REMOVE_BLOG } from '../../utils/mutations';

import { Card, Divider, Header, Grid, Image, Menu, Dropdown } from 'semantic-ui-react'

import Auth from '../../utils/auth';


const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};


  const [removeBlog, { error }] = useMutation(REMOVE_BLOG);

  const handleOnClick = async (blogId) => {
    const { data } = await removeBlog({
      variables: { blogId },
    });
    refetch();

  }


  // navigate to personal profile page if you are the admin
  if (Auth.loggedIn() && Auth.getProfile().data.username === "writteninnacode" || "admin_user") {

    return <div>

      <h1 style={{ marginBottom: '3rem' }}>Admin's Page</h1>

      <Divider horizontal style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Header as='h3'>
          Create  New Blog Post
        </Header>
      </Divider>

      <BlogForm refetch={refetch} />

      <Divider horizontal style={{ paddingTop: '6rem', marginBottom: '4rem' }}>
        <Header as='h3'>Your Blog Posts</Header>
      </Divider>

      <Grid stackable>
        <Grid.Row columns={3} >

          {user.blogs && user.blogs.map((blog) => (
            <Grid.Column >

              <Card key={blog._id} style={{ marginBottom: '4rem' }}>

                <Menu attached='top' >
                  <Link to={`/blog/${blog._id}`}><h2>{blog.blogTitle}</h2></Link>

                  <Menu.Menu position='right'>
                    <Dropdown item icon='wrench' simple >
                      <Dropdown.Menu >

                        <Dropdown.Item icon='edit' text='Edit' href={`/blog/${blog._id}/editblog`} />

                        <Dropdown.Item icon='trash' text='Delete' type="click" onClick={() => handleOnClick(blog._id)} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Menu>
                </Menu>

                <Card.Meta>{blog.createdAt}</Card.Meta>

                <Link to={`/blog/${blog._id}`}>
                  <Image centered src={blog.blogImage} style={{maxHeight: '280px' }}/>
                </Link>

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
      <div>
        <h4>You need to be logged in to see this.</h4>
        <Login />
      </div>
    );
  }

};

export default Profile;
