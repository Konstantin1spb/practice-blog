import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи.',
			response: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		response: true,
	};
};
