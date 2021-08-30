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
import { getUser, signOut } from '~/endpoints/auth'
import { getLikedSongs } from '~/endpoints/songs'

export default {
	name: 'User',
	meta: {
		requiresAuth: true,
	},
	layout: 'User',
	data() {
		return {
			user: {
				title: 'Username',
				icon: 'user',
				description: '',
			},
			password: {
				title: 'Password',
				icon: 'lock',
				description: '********',
			},
			likedSongs: {
				title: 'Liked songs',
				icon: 'heart',
				description: '',
			},
		}
	},
	computed: {
		finalList() {
			return [this.user, this.password, this.likedSongs]
		},
	},
	created() {
		this.getUserInfo()
		this.getLikedSongs()
	},
	methods: {
		getUserInfo() {
			const { data } = getUser()
			this.user.description = data
		},
		getLikedSongs() {
			const { data } = getLikedSongs()
			this.likedSongs.description = String(data.length)
		},
		logOut() {
			signOut()
			this.$router.push('/')
		},
	},
}
</script>
