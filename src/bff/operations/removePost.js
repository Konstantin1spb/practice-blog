import { getComments, deletePost, deleteComment } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен.',
			response: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);

	await Promise.all(comments.map(({ id }) => deleteComment(id)));

	return {
		error: null,
		response: true,
	};
};
