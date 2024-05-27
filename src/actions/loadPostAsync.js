import { setPostData } from './setPostData';

export const loadPostAsync = (requestServer, postId) => (dispatch) => {
	requestServer('fetchPost', postId).then((postData) => {
		dispatch(setPostData(postData.response));
	});
};
