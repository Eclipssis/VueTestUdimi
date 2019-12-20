import api from '@/api'

export default {
	namespaced: true,

	state: {
		userInfo: null,
		token: null
	},

	mutations: {
		setUserInfo(state, response) {
			state.userInfo = response.data.app_init.user
			state.token = response.data.token

			if (process.browser) {

				localStorage.setItem('user', JSON.stringify(response.data.app_init.user))
				localStorage.setItem('token', response.data.token)
			}
		}
	},

	actions: {
		async logIn({ commit }, { email, password }) {
			try {
				const responce = await api.request('post', '/auth/login', {
					email,
					password
				})
				commit('setUserInfo', responce)
				return responce
			} catch (error) {
				throw error.data.first_errors.email
			}
		}
	}
}
