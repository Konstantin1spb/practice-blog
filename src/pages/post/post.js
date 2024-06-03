import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments, PostForm } from './components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions/';
import { selectPost } from '../../selectors';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer, isCreating]);

	const post = useSelector(selectPost);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post}></PostForm>
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
