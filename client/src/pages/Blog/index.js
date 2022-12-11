import React from 'react';
import { useQuery } from '@apollo/client';

import BlogList from '../../components/BlogList';
import BlogForm from '../../components/BlogForm';

import { QUERY_BLOGS } from '../../utils/queries';



function Blog() {

	const { loading, data } = useQuery(QUERY_BLOGS);
	const blogs = data?.blogs || [];

	return (
		<main>

			<h1>
				This is the blog page.
			</h1>

			<div
				style={{ border: '1px dotted #1a1a1a' }}>
				<BlogForm />
			</div>

			<div>
				{loading
					? (<div>Loading...</div>)
					: (
						<BlogList
							blogs={blogs}
							title="Some Feed for blog post(s)..."
						/>
					)}
			</div>

		</main>
	);
}

export default Blog;