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
			message="Error"
			:description="error"
			type="error"
			show-icon
		/>

		<SongsList
			v-else
			:filter="filter"
			:songs="songs"
			@set-offset="setOffset"
		/>

		<a-back-top />
</div>
</template>

<script>
import { searchSongs } from '~/endpoints/songs'

export default {
	name: 'Home',
	components: {
		HomeControls: () => import('~/components/utils/HomeControls.vue'),
		SongsList: () => import('~/components/songs/SongsList.vue'),
	},
	layout: 'User',
	// TODO: Validate session
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
			if (newQuery) { this.query = newQuery }

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
	},
}
</script>
