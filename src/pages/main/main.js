import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		requestServer('fetchPosts').then((loadedPosts) => {
			setPosts(loadedPosts.response);
		});
	}, [requestServer]);

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
	}
`;
