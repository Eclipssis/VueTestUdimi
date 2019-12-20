<template>
	<div class="page login">
		<div class="login-wrap">
			<h2>Login</h2>
			<form class="login-form">
				<div class="form-logo">Q</div>

				<div class="form-group" :class="{'has-error': $v.authLogin.login.$dirty && $v.authLogin.login.$invalid || invalidForm}">
					<label 
						for="login" 
						class="label"
						v-if="authLogin.login.length > 0 || $v.authLogin.login.$invalid"
					>
						{{loginLabel}}
					</label>
					<input type="text" id="login" v-model="authLogin.login" placeholder="email">
				</div>

				<div class="form-group" :class="{'has-error': $v.authLogin.password.$dirty && $v.authLogin.password.$invalid}">
					<label 
						for="password" 
						class="label" 
						v-if="authLogin.password.length > 0 || $v.authLogin.password.$invalid"
					>
						{{passwordLabel}}
					</label>
					<input type="password" id="password" v-model="authLogin.password" placeholder="password">
				</div>

				<Button 
					type="submit" 
					name="primary" 
					size="large"
					:loading="loading"
					@click.prevent="logIn"
				>
					Login
				</Button>

				<div class="text-center">
					<a class="fogot-pass">Forgot password?</a>
				</div>
			</form>
			
		</div>
	</div>
</template>

<script>

	import Vue from 'vue'
	import Vuelidate from 'vuelidate'
	import Button from "@/components/Button";
	import { mapActions } from 'vuex'
	import { validationMixin } from 'vuelidate'
	const { required } = require('vuelidate/lib/validators')

	Vue.use(Vuelidate)
	
	export default {
		name: 'login',

		components: {
			Button
		},

		mixins: [validationMixin],

  	validations: {
			authLogin: {
				login: {
					required
				},

				password: {
					required
				}
			}
		},

		data() {
			return {
				invalidForm: false,
				loginLabel: 'Email',
				passwordLabel: 'Password',
				authLogin: {
					login: '',
					password: ''
				},
				loading: false
			}
		},

		watch: {
			authLogin: {
				handler: function(newValue) {
					this.invalidForm = false
					this.checkValidationLogin()
				},
				deep: true
			}
		},

		methods: {
			...mapActions({
				loginAction: 'auth/logIn'
			}),

			checkValidationLogin () {
				if (this.$v.authLogin.login.$dirty && this.$v.authLogin.login.$invalid) {
					this.loginLabel = 'Email can not be blank'
				}

				if (this.$v.authLogin.password.$dirty && this.$v.authLogin.password.$invalid) {
					this.passwordLabel = 'Password can not be blank'
				}
			},

			async logIn(e) {
				this.$v.authLogin.$touch()
				this.checkValidationLogin()

				if (!this.$v.authLogin.$invalid) {
					try {
						this.loading = true
						await this.loginAction({
							email: this.authLogin.login,
							password: this.authLogin.password,
						})
						this.$router.push('/')
					} catch (error) {
						this.loginLabel = error
						this.invalidForm = true
					} finally {
						this.loading = false
					}
				}

				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.form-group {
		margin-bottom: 30px;
		&.has-error label {
			color: #d40000;
		}

		&.has-error input {
			border: 1px solid #d40000;
		}
	}

	.login-wrap h2 {
		font-size: 29px;
		font-weight: 500;
    margin-bottom: 29px;
	}

	.login-wrap {
		max-width: 440px;
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}

	.login-form {
		box-shadow: 0 0 9px 0 rgba(0,0,0,.19);
    padding: 25px 40px 35px;
    border: 1px solid #e7e7e7;
    border-radius: 7px;
		text-align: left;
    background: #fff;

		.btn {
			width: 100%;
			margin-bottom: 20px;
		}
	}

	.label {
		margin: 0 10px;
    max-width: calc(100% - 20px);
    position: absolute;
    top: -.55em;
    background: #fff;
    display: block;
    float: left;
    padding: 0 3px;
		font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
		color: #4b84da;
	}

	.form-logo {
		font-weight: 700;
    font-size: 80px;
    text-align: center;
    margin-bottom: 20px;
	}

	.fogot-pass {
		font-size: 14px;
		color: #2975dc;
	}
</style>