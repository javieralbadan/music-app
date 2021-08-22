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
		</a-list>
	</div>
</template>

<script>
export default {
	name: 'User',
	layout: 'User',
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
				description: 0,
			},
		}
	},
	computed: {
		finalList() {
			return [this.user, this.password, this.likedSongs]
		},
	},
	created() {
	},
}
</script>
