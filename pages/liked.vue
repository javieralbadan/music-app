<template>
  <div>
		<a-page-header title="Liked" />

		<div v-if="loading" class="wrap-loading">
			<a-spin tip="Loading..." size="large" />
		</div>

		<SongsList v-else :songs="songs" />
	</div>
</template>

<script>
import { getLikedSongs } from '~/endpoints/songs'

export default {
	name: 'Liked',
	meta: {
		requiresAuth: true,
	},
	components: {
		SongsList: () => import('~/components/songs/SongsList.vue'),
	},
	layout: 'User',
	data() {
		return {
			loading: true,
			songs: [],
		}
	},
	created() {
		this.getLikedSongs()
	},
	methods: {
		getLikedSongs() {
			const { data } = getLikedSongs()
			this.songs = data || []
			this.loading = false
		},
	},
}
</script>
