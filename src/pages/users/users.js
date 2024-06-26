import { PrivateContent, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils/checkAccess';
import { ROLE } from '../../constants/role';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const userRole = useSelector(selectUserRole);
	const requestServer = useServerRequest();
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([users, roles]) => {
				if (users.error || roles.error) {
					setErrorMessage(users.error || roles.error);
					return;
				}

				setUsers(users.response);
				setRoles(roles.response);
			},
		);
	}, [requestServer, shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id }) => Number(id) !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
`;
