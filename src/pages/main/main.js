import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks, debounce } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ response: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
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
			) : (
				<div className="no-posts-found">Статьи не найдены</div>
			)}
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

	.no-posts-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
