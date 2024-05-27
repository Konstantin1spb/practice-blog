import styled from 'styled-components';
import { Icon } from '../../../../../components';

const CommentContainer = ({ className, id, author, publishedAt, content }) => {
	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" size="20px" noPointer />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" size="18px" noPointer />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon id="fa-trash-o" size="23px" margin="0 0 0 10px" />
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 15px;

	.comment {
		width: 100%;
		border: 1.5px solid #000;
		border-radius: 2px;
		padding: 4px 10px;
	}

	.information-panel {
		display: flex;
		justify-content: space-between;
	}

	.author,
	.published-at {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.comment-text {
		font-size: 18px;
		margin: 4px 0;
	}
`;
