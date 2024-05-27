import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи.',
			response: null,
		};
	}

	await setUserRole(userId, newUserRoleId);

	return {
		error: null,
		response: true,
	};
};
