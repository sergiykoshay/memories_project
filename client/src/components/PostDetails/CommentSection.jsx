import React,  { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';
const CommentSection = ({post}) => {
    const classes = useStyles();
    const [ comments, setComments ] = useState(post?.comments);
    const [ comment, setComment ] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
        <div>
            <div className={classes.commentsOutterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((comment, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{comment.split(': ')[0]}</strong>
                                {comment.split(':')[1]}

                            </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (  
                    <div style={{ width: '70%'}}>
                        <Typography gutterBottom variant="h6">write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: '10px'}}
                            fullWidth
                            color="primary"
                            disabled={!comment}
                            variant="contained"
                            onClick={handleClick}
                        >
                            Add Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>

    )
}

export default CommentSection;