export const transformComment = (dbComment) => ({
	id: dbComment.id,
	author: dbComment.author_login,
	publishedAt: dbComment.published_at,
	content: dbComment.content,
});
