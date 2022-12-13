import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import BlogForm from '../../components/BlogForm';
// import BlogList from '../../components/BlogList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import { Card, Button } from 'semantic-ui-react'

import Auth from '../../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};


  // navigate to personal profile page if you are the admin
  if (Auth.loggedIn() && Auth.getProfile().data.username === "writteninnacode") {

    return <div>

      <h1>Admin's Page</h1>

      <BlogForm />

      <div >

        {user.blogs && user.blogs.map((blog) => (

          <Card key={blog._id}>

            <h3>
              <Link to={`/blogs/${blog._id}`}>
                {blog.blogAuthor}
                <br />
                <span style={{ fontSize: '1rem' }}>
                  created this blog post on {blog.createdAt}
                </span>
              </Link>
            </h3>

            <h4>{blog.blogTitle}</h4>

            <div>
              <p>{blog.blogText}</p>
            </div>

            <Link to={`/blogs/${blog._id}`}>
              Comment on this blog post.
            </Link>
            <Button type="click">Delete</Button>


          </Card>
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

  // return (
  //   <div>
  //     <div>
  //       <h2>
  //         Viewing {userParam ? `${user.username}'s` : 'your'} profile.
  //       </h2>

  //       <div >
  //         <BlogList
  //           blogs={user.blogs}
  //           title={`${user.username}'s blog posts...`}
  //           showTitle={false}
  //           showUsername={false}
  //         />
  //       </div>

  //       <br />
  //     </div>
  //   </div>
  // );
};

export default Profile;
