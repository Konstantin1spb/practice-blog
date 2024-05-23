import { sessions } from '../sessions';
import { getUser } from '../api';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Пользователь не найден',
			response: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (password !== authPassword) {
		return {
			error: 'Неверный пароль',
			response: null,
		};
	}

	return {
		error: null,
		response: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	};
};
