<template>
  <div>
		<a-page-header title="User" />

		<a-list item-layout="horizontal" :data-source="finalList">
			<a-list-item slot="renderItem" slot-scope="item">
				<a-list-item-meta :description="item.description">
					<span slot="title">{{ item.title }}</span>
					<a-avatar slot="avatar" :icon="item.icon" />
				</a-list-item-meta>
			</a-list-item>

			<a-list-item>
				<a-list-item-meta>
					<span slot="title">User session</span>
					<a-avatar icon="sign out" />
				</a-list-item-meta>
				<a-button type="danger" @click="logOut">
					Log out
				</a-button>
			</a-list-item>
		</a-list>
	</div>
</template>

<script>
// import signIn from '~/endpoints/auth'

export default {
	name: 'User',
	layout: 'User',
	// TODO: Validate session
	data() {
		return {
			user: {
				title: 'Username',
				icon: 'user',
				description: 'Username',
			},
			password: {
				title: 'Password',
				icon: 'lock',
				description: '********',
			},
			likedSongs: {
				title: 'Liked songs',
				icon: 'heart',
				description: '0',
			},
		}
	},
	computed: {
		finalList() {
			return [this.user, this.password, this.likedSongs]
		},
	},
	created() {
		// TODO: Load from localStorage
	},
	methods: {
		logOut() {
			// TODO: Create this method with error handler
			// signOut()
			this.$router.push('/')
		},
	},
}
</script>
