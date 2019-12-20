<template>
	<div class="project-single">
		<h2 class="project-title">PROJECT PAGE</h2>

		<input 
			v-if="project" 
			v-model="project.name" 
			class="project-name"
			placeholder="Enter project name..."
			:class="{error: $v.project.name.$dirty && $v.project.name.$invalid}"
		>
		<span v-if="$v.project.name.$dirty && $v.project.name.$invalid" class="error-text">Project name is required</span>

		<DataPanel :project="project"></DataPanel>
		<Button name="primary" class="save-btn" :loading="loading" @click="onUpdateProject">Save</Button>

	</div>
</template>

<script>
  import { mapActions } from 'vuex'
	import Button from "@/components/Button";
	import DataPanel from '~/components/DataPanel.vue'
	import { validationMixin } from 'vuelidate'
	const { required } = require('vuelidate/lib/validators')

	export default {
		name: 'project',

		components: {
			DataPanel,
			Button
		},

		mixins: [validationMixin],

		validations: {
			project: {
				name: {
					required
				}
			}
		},

		data() {
			return {
				project: null,
				loading: false
			}
		},

		methods: {
			...mapActions({
				fetchProject: 'project/fetchSingleProject',
				updateProject: 'project/updateProject'
			}),

			async onUpdateProject() {
				this.$v.project.$touch()

				if (!this.$v.project.$invalid) {
					try {
						this.loading = true
						await this.updateProject(this.project)
						this.$router.push('/')
					} catch (error) {
						console.log('handle error', error)
					} finally {
						this.loading = false
					}
				}
				
			}
		},

		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.fetchProject(to.params.id).then((response) => {
					vm.project = response.project
				}).catch((error) => {
					console.log('handle error', error)
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.project-single {
		padding: 25px;
		max-width: 600px;
	}

	.project-title {
		margin-bottom: 25px;
	}

	.date-panel {
		margin-top: 10px;
	}

	.save-btn {
		margin-top: 20px;
	}

	.error-text {
		display: inline-block;
		color: red; 
		font-size: 13px;
	}
</style>