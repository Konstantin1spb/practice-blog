import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getRoles } from '../api';

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Оставлять комментарии могут только авторизованные пользователи.',
			response: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		response: roles,
	};
};
