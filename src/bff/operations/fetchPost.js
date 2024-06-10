import { getPost, getComments } from '../api';

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			response: null,
		};
	}

	const comments = await getComments(postId);

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	};
};
