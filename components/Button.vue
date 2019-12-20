<template>
	<button 
		class="btn" 
		:type="type" 
		:class="[name, size, {disabled: loading}]" 
		:disabled="loading"
		@click="handleClick" >
		<Spiner v-if="loading"></Spiner>
		<slot v-else></slot>
	</button>
</template>

<script>
	import Spiner from "@/components/Spiner";

	export default {
		name: 'Button',

		components: {
			Spiner
		},

		props: {
			type: {
				type: String,
				default: 'button'
			},

			name: {
				type: String,
				default: 'default'
			},

			size: {
				type: String,
				default: ''
			},

			loading: {
				type: Boolean,
				default: false
			}
		},

		methods: {
			handleClick(e) {
				this.$emit('click', e)
			}
		},
	}
</script>

<style lang="scss" scoped>
	$primary-color: #2668c1;

	.btn {
		padding: 8px 15px;
		font-size: 16px;
    border-radius: 9px;
    font-weight: 400;
		box-shadow: none;
		border: none;
		cursor: pointer;

  	&.primary {
			color: #ffffff;
			background: $primary-color;
			&:hover {
				background: lighten($primary-color, 20%);
			}

			&.disabled {
				background: lighten($primary-color, 20%);
			}
		}

		&.large {
			padding: 15px;
			font-size: 18px;
		}
	}
</style>