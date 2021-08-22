<template>
  <a-tabs default-active-key="0" tab-position="bottom" class="nav-bottom" @change="changeTab">
    <a-tab-pane v-for="(item, index) in tabs" :key="index">
      <span slot="tab">
        <a-icon :type="item.icon" />
        {{ item.text }}
      </span>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
	name: 'AppNav',
	data() {
		return {
			tabs: [
				{ id: 'home', icon: 'home', text: 'Home' },
				{ id: 'liked', icon: 'heart', text: 'Liked' },
				{ id: 'user', icon: 'user', text: 'User' },
			],
		}
	},
	methods: {
		changeTab(index) {
			this.$router.push(`/${this.tabs[index].id}`)
		},
	},
}
</script>

<style lang="scss" scoped>
.nav-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
}
</style>
