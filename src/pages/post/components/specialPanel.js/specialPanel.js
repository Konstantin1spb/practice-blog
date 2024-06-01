import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onPostRemove = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить пост?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, postId)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
					document.body.style.overflow = '';
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
					document.body.style.overflow = '';
				},
			}),
		);
		document.body.style.overflow = 'hidden';
	};
	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" noPointer />
				)}
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				{publishedAt && (
					<Icon
						id="fa-trash-o"
						size="21px"
						margin="0 0 0 10px"
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${({ margin }) => margin};

	.published-at {
		display: flex;
		align-items: center;
	}

	.buttons {
		display: flex;
		align-items: center;
	}
`;
