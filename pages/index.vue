<template>
	<a-row type="flex" justify="center" align="middle" class="login">
		<a-col :xs="18" :sm="14" :md="10" :lg="8">
			<h1 align="center">Login</h1>
			<LoginForm />
		</a-col>
	</a-row>
</template>

<script>
export default {
	name: 'Index',
	components: {
		LoginForm: () => import('~/components/login/LoginForm.vue'),
	},
}
</script>

<style lang="scss" scoped>
.login {
	height: 100vh;
}
</style>
