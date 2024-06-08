import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments, PostForm } from './components';
import { Error, PrivateContent } from '../../components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions/';
import { ROLE } from '../../constants';
import { selectPost } from '../../selectors';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			if (postData.error) {
				setError(postData.error);
			}
			setIsLoading(false);
		});
	}, [dispatch, params.id, requestServer, isCreating]);

	const post = useSelector(selectPost);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post}></PostForm>
				</div>
			</PrivateContent>
		) : (
			<>
				<div className={className}>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</div>
			</>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
