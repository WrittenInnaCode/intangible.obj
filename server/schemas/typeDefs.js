const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
    	blogs: [Blog]!
	}

	type Blog {
    	_id: ID
    	blogText: String
		blogTitle: String
    	blogAuthor: String
    	createdAt: String
		blogImage: String
    	comments: [Comment]!
  	}

  	type Comment {
    	_id: ID
    	commentText: String
    	commentAuthor: String
    	createdAt: String
  	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(username: String!): User
    	blogs(username: String): [Blog]
    	blog(blogId: ID!): Blog
		me: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
    	addBlog(blogText: String!, blogTitle: String!, blogImage: String!): Blog
    	addComment(blogId: ID!, commentText: String!): Blog
    	removeBlog(blogId: ID!): Blog
		editBlog(blogId: ID!, blogText: String!, blogTitle: String!, blogImage: String!): Blog
    	removeComment(blogId: ID!, commentId: ID!): Blog
	}
`;

module.exports = typeDefs;
