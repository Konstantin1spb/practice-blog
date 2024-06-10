import { addComment, getComments, getPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const addPostComment = async (hash, userLogin, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи.',
			response: null,
		};
	}

	await addComment(userLogin, postId, content);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	};
};
