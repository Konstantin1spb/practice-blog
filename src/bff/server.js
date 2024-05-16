import { getUser, addUser, sessions } from './index';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Пользователь не найден',
				response: null,
			};
		}

		if (user.password !== authPassword) {
			return {
				error: 'Неверный пароль',
				response: null,
			};
		}

		return {
			error: null,
			response: {
				id: user.id,
				login: user.login,
				roleId: user.roleId,
				session: sessions.create(user),
			},
		};
	},

	async register(regLogin, regPassword) {
		const user = getUser(regLogin);

		if (user) {
			return {
				error: 'Пользователь с таким именем уже существует',
				response: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			response: {
				id: user.id,
				login: user.login,
				roleId: user.roleId,
				session: sessions.create(user),
			},
		};
	},
};
