<template>
	<div class="header">
		<div class="logo">Q</div>
		<ul class="menu">
			<li v-if="!user" class="menu__item">
				<router-link :to="'/login'" class="menu__link">Login</router-link>
			</li>

			<li v-if="user" class="menu__item">
				<a class="menu__link" @click="onLogOut">Log out</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
	export default {
		name: 'Header',

		computed: {
			...mapState({
				user: state => state.auth.userInfo
			}),
		},

		methods: {
			...mapActions({
				logOut: 'auth/logOut'
			}),

			async onLogOut () {
				try {
					await this.logOut()
					this.$router.push('/login')

				} catch (error) {
					console.log('handle error', error)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 20px;
		justify-content: space-between;
		box-shadow: 0 1px 1px #7c7c7c;
		background: #ffffff;
		z-index: 1000;
	}

	.logo {
		font-size: 28px;
		font-weight: 700;
	}
	
	.menu {
		display: flex;
		list-style: none;

		&__link {
			display: inline-block;
			padding: 13px;
			cursor: pointer;
			&:hover {
				color: #c44512;
    		background: #e0e0e0;
			}
		}
	}
</style>