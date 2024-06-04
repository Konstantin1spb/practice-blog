import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((loadedPosts) => {
			setPosts(loadedPosts.response);
			setLastPage(loadedPosts.lastPage);
		});
	}, [requestServer, page]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						publishedAt={publishedAt}
						commentsCount={commentsCount}
					/>
				))}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	margin-top: 40px;
	padding: 0 40px;

	.post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		margin-bottom: 40px;
	}
`;
