import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query Query {
		users {
			username
			email
			_id
		}
	}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      blogs {
        _id
        blogText
        blogTitle
        createdAt
      }
    }
  }
`;


export const QUERY_BLOGS = gql`
  query getBlogs {
    blogs {
      _id
      blogText
      blogTitle
      blogAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_BLOG = gql`
  query getSingleBlog($blogId: ID!) {
    blog(blogId: $blogId) {
      _id
      blogText
      blogTitle
      blogAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// export const QUERY_ME = gql`
// 	query Query {
// 		me {
// 			username
// 			email
// 			_id
// 		}
// 	}
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      blogs {
        _id
        blogText
        blogTitle
        blogAuthor
        createdAt
      }
    }
  }
`;
