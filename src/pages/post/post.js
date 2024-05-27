import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments } from './components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions/loadPostAsync';
import { selectPost } from '../../selectors';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	const post = useSelector(selectPost);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
