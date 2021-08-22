<template>
	<a-row type="flex" justify="center" align="middle" class="login">
    <a-col :xs="22" :sm="20" :md="18" :lg="16">
      <nuxt />
			<AppNav />
    </a-col>
  </a-row>
</template>

<script>
export default {
	components: {
		AppNav: () => import('~/components/layout/AppNav.vue'),
	},
}
</script>
