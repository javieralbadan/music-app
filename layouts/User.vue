<template>
	<a-row type="flex" justify="center" align="middle" class="container">
    <a-col :xs="22" :sm="20" :md="18" :lg="16">
			<nuxt />
    </a-col>
    <a-col :xs="24" :sm="24" :md="18" :lg="16">
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

<style lang="scss" scoped>
$nav-height: 60px;

.container {
	.ant-col:first-child {
		height: calc(100vh - #{$nav-height});
		overflow-y: auto;
	}
}
</style>
