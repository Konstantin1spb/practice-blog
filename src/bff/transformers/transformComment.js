export const transformComment = (dbComment) => ({
	id: dbComment.id,
	author: dbComment.author_login,
	postId: dbComment.post_id,
	publishedAt: dbComment.published_at,
	content: dbComment.content,
});
