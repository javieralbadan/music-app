<template>
  <a-form-model
    ref="loginForm"
    :model="form"
    :rules="rules"
  >
		<a-form-model-item ref="user" prop="user">
      <a-input
				v-model="form.user"
        type="text"
        placeholder="Username"
        @blur="updateOnBlur('user')"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>

		<a-form-model-item ref="password" prop="password">
      <a-input
				v-model="form.password"
        type="password"
        placeholder="Password"
        @blur="updateOnBlur('password')"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>

    <a-form-model-item>
      <a-button type="primary" html-type="submit" block @click="onSubmit">
        Log in
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { LOGIN_FORM } from '~/plugins/form-validations'
// import signIn from '~/endpoints/auth'

export default {
	name: 'FormLogin',
	data() {
		return {
			form: {
				user: '',
				password: '',
			},
			rules: LOGIN_FORM,
		}
	},
	methods: {
		updateOnBlur(field) {
			return this.$refs[field]?.onFieldBlur()
		},
		onSubmit() {
			this.$refs.loginForm.validate((valid) => {
				if (!valid) {
					return false
				}

				// TODO: Create this method with error handler
				// signIn()
				this.$router.push('/home')
			})
		},
	},
}
</script>
