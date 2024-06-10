import { setPostData } from './setPostData';

export const removeCommentAsync = (requestServer, id, postId) => (dispatch) => {
	requestServer('removePostComment', id, postId).then((postData) => {
		dispatch(setPostData(postData.response));
	});
};
