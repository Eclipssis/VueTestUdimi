import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import project from '@/store/modules/project'

Vue.use(Vuex)


const store = () => new Vuex.Store({
	modules: {
		project,
		auth
	}
})

export default store