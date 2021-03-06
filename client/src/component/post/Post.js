import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from '../posts/CommentForm';
import CommentItem from '../post/CommentItem';



const Post = ({getPost, post : { loading, post}, match}) => {

    useEffect(()=>{
        getPost(match.params.id);
    },[getPost]);
    return loading || post===null ? (<Spinner/>) : (<Fragment>

        <Link to = '/posts' className = 'btn'> Back to posts</Link>
        <PostItem post = {post} showActions ={false}/>
        <CommentForm postId = {post._id}/>
        <div className = "comments">
            {post.comments && post.comments.map(comment => (
                <CommentItem key ={comment._id} comment ={comment} postId ={post._id}/>
            ))}
        </div>
    </Fragment>)
}
const mapStateToProps = state =>({
    post : state.post
})

Post.propTypes = {
    getPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPost})(Post);