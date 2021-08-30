<template>
	<div>
		<a-page-header title="Home" />

		<HomeControls
			:disabled="loading"
			@load-songs="loadSongs"
			@set-filter="setFilter"
		/>

		<div v-if="loading" class="wrap-loading">
			<a-spin tip="Loading..." size="large" />
		</div>

		<a-alert
			v-else-if="error"
			type="error"
			message="Error"
			show-icon
			:description="error"
		/>

		<SongsList
			v-else
			:filter="filter"
			:songs="songs"
			:pagination="pagination"
			show-like-button
			@like-song="likeSong"
			@set-offset="setOffset"
		/>

		<a-back-top />
</div>
</template>

<script>
import { searchSongs, saveLikedSong } from '~/endpoints/songs'

export default {
	name: 'Home',
	meta: {
		requiresAuth: true,
	},
	components: {
		HomeControls: () => import('~/components/utils/HomeControls.vue'),
		SongsList: () => import('~/components/songs/SongsList.vue'),
	},
	layout: 'User',
	data() {
		return {
			error: '',
			filter: '',
			loading: true,
			pagination: {},
			offset: 0,
			query: '',
			songs: [],
		}
	},
	methods: {
		async loadSongs(newQuery) {
			this.loading = true
			if (newQuery) {
				this.query = newQuery
				this.offset = 0
			}

			const { offset, query } = this
			const { data, error } = await searchSongs({ query, offset })
			this.loading = false
			this.error = error

			if (!data || error) {
				return
			}

			const { songs, pagination } = data || {}
			this.songs = songs
			this.pagination = pagination
		},
		setFilter(filter) {
			this.filter = filter
		},
		setOffset(newOffset) {
			this.offset = newOffset
			this.loadSongs()
		},
		async likeSong(item) {
			const { data } = await saveLikedSong(item)
			if (!data) {
				return
			}

			const targetIndex = this.songs.findIndex(({ id }) => id === item.id)
			if (targetIndex) {
				this.songs[targetIndex].liked = true
			}
		},
	},
}
</script>
