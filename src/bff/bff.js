import { getUser, createSession, addUser } from './index';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = getUser(authLogin);

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
			response: createSession(user.role_id),
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
			response: createSession(user.role_id),
		};
	},
};
