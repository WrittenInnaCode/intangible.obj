import React from 'react';

import { Label, Icon, Comment } from 'semantic-ui-react'

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet!</h3>;
  }

  return (
    <>

      {comments &&
        comments.map((comment) => (
          <div key={comment._id} >
            <Comment.Group>
              <Comment style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <Comment.Avatar as='a'
                  src={require('../../assets/images/icon-comment.png')}
                />
                <Comment.Content>
                  <Comment.Author as='a' style={{ cursor: 'default' }}>{comment.commentAuthor}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.commentText}</Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </div>
        ))}

    </>
  );
};

export default CommentList;
