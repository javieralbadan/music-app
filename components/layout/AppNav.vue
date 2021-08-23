<template>
	<a-tabs
		tab-position="bottom"
		:default-active-key="activeKey"
		@change="changeTab"
	>
		<a-tab-pane
			v-for="(item, index) in tabs"
			:key="String(index + 1)"
		>
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
			activeKey: 1,
			tabs: [
				{ id: 'home', icon: 'home', text: 'Home' },
				{ id: 'liked', icon: 'heart', text: 'Liked' },
				{ id: 'user', icon: 'user', text: 'User' },
			],
		}
	},
	created() {
		this.setActiveKey()
	},
	methods: {
		setActiveKey() {
			const currentTab = this.tabs.findIndex(({ id }) => id === this.$route.name)
			this.activeKey = String(currentTab + 1)
		},
		changeTab(index) {
			const newPath = this.tabs[index - 1].id
			this.$router.push(`/${newPath}`)
		},
	},
}
</script>
