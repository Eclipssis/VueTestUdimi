import api from '@/api'

export default {
	namespaced: true,

	state: {
		projectList: []
	},

	mutations: {
		setProjectList(state, projects) {
			state.projectList = projects
		}
	},

	actions: {
		async fetchProjects({ commit }) {
			try {
				const response = await api.request('get', '/projects-manage/index')
				commit('setProjectList', response.data.projects)
				return response.data.projects
			} catch (error) {
				throw error
			}
		},

		async fetchSingleProject({ commit }, projectId) {
			try {
				const response = await api.request('get', `/projects-manage/${projectId}`)
				return response.data
			} catch (error) {
				throw error
			}
		},

		async updateProject({ commit }, project) {
			try {
				const response = await api.request('post', `/projects-manage/update?id=${project.id}`, project)
				return response.data
			} catch (error) {
				throw error
			}
		},


	}
}
