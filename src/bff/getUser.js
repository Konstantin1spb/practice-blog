import { getUsers } from './getUsers';

export const getUser = async (loginToFind) => {
	const users = await getUsers();
	return users.find(({ login }) => loginToFind === login);
};
