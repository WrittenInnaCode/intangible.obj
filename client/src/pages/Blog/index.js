import React from 'react';
import { useQuery } from '@apollo/client';

import BlogList from '../../components/BlogList';

import { QUERY_BLOGS } from '../../utils/queries';


function Blog() {

	const { loading, data } = useQuery(QUERY_BLOGS);
	const blogs = data?.blogs || [];

	return (
		<main>
			<div>
				{loading
					? (<div>Loading...</div>)
					: (
						<BlogList
							blogs={blogs}
							title="Blog"
						/>
					)}
			</div>

		</main>
	);
}

export default Blog;