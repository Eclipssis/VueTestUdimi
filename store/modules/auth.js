import api from '@/api'

export default {
	namespaced: true,

	state: {
		userInfo: null,
		token: null
	},

	mutations: {
		setUserInfo(state, { userInfo, token }) {
			state.userInfo = userInfo
			state.token = token

			if (process.browser) {
				localStorage.setItem('user', JSON.stringify(userInfo))
				localStorage.setItem('token', token)
			}
		},

		setUser(state, { user, token }) {
			state.userInfo = user
			state.token = token
		}
	},

	actions: {
		async logIn({ commit }, { email, password }) {
			try {
				const response = await api.request('post', '/auth/login', {
					email,
					password
				})

				commit('setUserInfo', {
					userInfo: response.data.app_init.user,
					token: response.data.token
				})
				return response
			} catch (error) {
				throw error.data.first_errors.email
			}
		},

		async logOut({ commit }) {
			await api.request('post', '/auth/logout')

			commit('setUserInfo', {
				userInfo: null,
				token: null
			})
			localStorage.removeItem('user')
			localStorage.removeItem('token')
		}
	}
}
