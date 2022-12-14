const { AuthenticationError } = require('apollo-server-express');
const { User, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return await User.find({}).select('-password').populate('blogs');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate('blogs');
		},
		blogs: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Blog.find(params).sort({ _id: -1 });
		},
		blog: async (parent, { blogId }) => {
			return Blog.findOne({ _id: blogId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('blogs');

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		}
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
		  const user = await User.create({ username, email, password });
		  const token = signToken(user);
		  return { token, user };
		},

		login: async (parent, { email, password }) => {
		  const user = await User.findOne({ email });
	
		  if (!user) {
			throw new AuthenticationError('No user found with this email address');
		  }
	
		  const correctPw = await user.isCorrectPassword(password);
	
		  if (!correctPw) {
			throw new AuthenticationError('Incorrect credentials');
		  }
	
		  const token = signToken(user);
	
		  return { token, user };
		},

		addBlog: async (parent, { blogText, blogTitle, blogImage }, context) => {
		  if (context.user) {
			// console.log(typeofblogImage)
			const blog = await Blog.create({
			  blogText,
			  blogTitle,
			  blogImage,
			  blogAuthor: context.user.username,
			});
	
			await User.findOneAndUpdate(
			  { _id: context.user._id },
			  { $addToSet: { blogs: blog._id } }
			);
	
			return blog;
		  }
		  throw new AuthenticationError('You need to be logged in!');
		},

		addComment: async (parent, { blogId, commentText }, context) => {
		  if (context.user) {
			return Blog.findOneAndUpdate(
			  { _id: blogId },
			  {
				$addToSet: {
				  comments: { commentText, commentAuthor: context.user.username },
				},
			  },
			  {
				new: true,
				runValidators: true,
			  }
			);
		  }
		  throw new AuthenticationError('You need to be logged in!');
		},

		removeBlog: async (parent, { blogId }, context) => {
		  if (context.user) {
			const blog = await Blog.findOneAndDelete({
			  _id: blogId,
			  blogAuthor: context.user.username,
			});
	
			await User.findOneAndUpdate(
			  { _id: context.user._id },
			  { $pull: { blogs: blog._id } }
			);
	
			return blog;
		  }
		  throw new AuthenticationError('You need to be logged in!');
		},

		editBlog: async (parent, { blogId, blogText, blogTitle, blogImage }, context) => {
			if (context.user) {
			  const blog = await Blog.findByIdAndUpdate(blogId, {$set: {
				blogTitle,
			    blogText,
			    blogImage,
			  }});
			  return blog;
			}
			throw new AuthenticationError('You need to be logged in!');
		  },
		
		removeComment: async (parent, { blogId, commentId }, context) => {
		  if (context.user) {
			return Blog.findOneAndUpdate(
			  { _id: blogId },
			  {
				$pull: {
				  comments: {
					_id: commentId,
					commentAuthor: context.user.username,
				  },
				},
			  },
			  { new: true }
			);
		  }
		  throw new AuthenticationError('You need to be logged in!');
		},
	  },
};

module.exports = resolvers;
