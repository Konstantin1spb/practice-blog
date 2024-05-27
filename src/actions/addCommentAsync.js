import { setPostData } from './setPostData';

export const addCommentAsync =
	(requestServer, userLogin, postId, content) => (dispatch) => {
		requestServer('addPostComment', userLogin, postId, content).then((postData) => {
			if (postData.error) {
				return postData.error;
			}
			dispatch(setPostData(postData.response));
		});
	};
