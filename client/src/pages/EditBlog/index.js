import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';

import BlogForm from '../../components/BlogForm';

import { QUERY_USER, QUERY_ME, QUERY_SINGLE_BLOG } from '../../utils/queries';

import { EDIT_BLOG } from '../../utils/mutations';

import { Divider, Header } from 'semantic-ui-react'


const EditBlog = () => {

    const { blogId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_BLOG, {
        variables: { blogId: blogId },
    });
console.log(data)

    const [editBlog, { error }] = useMutation(EDIT_BLOG);

    return <div>


        <Divider horizontal style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <Header as='h3'>
                Edit Blog Post
            </Header>
        </Divider>


        { !loading && <BlogForm blogItem={data.blog} edit={editBlog} blogId={blogId} /> }

    </div>


};


export default EditBlog;