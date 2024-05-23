import { sessions } from '../sessions';
import { getUser, addUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Пользователь с таким именем уже существует',
			response: null,
		};
	}

	const user = await addUser(regLogin, regPassword);

	return {
		error: null,
		response: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session: sessions.create(user),
		},
	};
};
