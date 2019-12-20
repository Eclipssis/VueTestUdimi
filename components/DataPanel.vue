<template>
	<div class="date-panel" v-if="project">
		<div class="date-panel__item">
			<span class="date-panel__title">time this week</span>
			<span class="date-panel__value">{{ moment(project.spent_time_week, 'HHmmss').format('HH:mm:ss') }}</span>
		</div>

		<div class="date-panel__item">
			<span class="date-panel__title">this month</span>
			<span class="date-panel__value">{{ moment(project.spent_time_month, 'HHmmss').format('HH:mm:ss') }}</span>
		</div>

		<div class="date-panel__item">
			<span class="date-panel__title">total</span>
			<span class="date-panel__value">{{ moment(project.spent_time_all, 'HHmmss').format('HH:mm:ss') }}</span>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'

	export default {
		name: 'DataPanel',

		data() {
			return {
				moment: moment
			}
		},

		props: {
			project: {
				type: Object,
				default: () => {}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.date-panel {
		&__title {
			display: inline-block;
			min-width: 120px;
		}

		&__value {
			font-weight: 700;
		}
	}
</style>