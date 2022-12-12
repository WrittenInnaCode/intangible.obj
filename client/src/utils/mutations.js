import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog($blogText: String!) {
    addBlog(blogText: $blogText) {
      _id
      blogText
      blogAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation removeBlog($blogText: ID!) {
    removeBlog(blogId: $blogId) {
      _id
      blogText
      blogAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($blogId: ID!, $commentText: String!) {
    addComment(blogId: $blogId, commentText: $commentText) {
      _id
      blogText
      blogAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
