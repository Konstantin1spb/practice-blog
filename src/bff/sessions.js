import { addSession, getSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);
		addSession(hash, user);
		return hash;
	},
	async remove(hash) {
		const dbSession = await getSession(hash);

		if (!dbSession) {
			return;
		}

		deleteSession(dbSession.id);
	},
	async access(hash, accessRoles) {
		const dbSession = await getSession(hash);
		if (!dbSession) {
			return false;
		}
		return !!dbSession.user && accessRoles.includes(dbSession.user.roleId);
	},
};
