<template>
  <div>
		<a-page-header title="Home · J Balvin music" />

		<a-input-search
			v-model="filter"
			placeholder="Filter your songs"
			size="large"
			@search="onFilter"
		>
			<a-button slot="enterButton" icon="filter" />
    </a-input-search>

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

		<a-list v-else item-layout="horizontal" :data-source="finalSongs">
			<a-list-item slot="renderItem" slot-scope="item">
				<a-button slot="actions" type="dashed" shape="circle" icon="heart" />
				<a-list-item-meta :description="getArtists(item)">
					<span slot="title">{{ item.name }}</span>
					<a-avatar slot="avatar" :src="getAlbumImage(item)" />
				</a-list-item-meta>
			</a-list-item>
		</a-list>

		<a-back-top />
</div>
</template>

<script>
import { searchSongs } from '~/endpoints/songs'

const DEFAULT_QUERY = 'J%20Balvin'

export default {
	name: 'Home',
	layout: 'User',
	// TODO: Validate session
	data() {
		return {
			error: '',
			loading: true,
			songs: [],
			filter: '',
		}
	},
	computed: {
		finalSongs() {
			if (!this.filter) {
				return this.songs
			}

			return this.songs.filter(({ name }) => name.includes(this.filter))
		},
	},
	created() {
		this.loadSongs(DEFAULT_QUERY)
	},
	methods: {
		async loadSongs(query) {
			this.loading = true

			const { data, error } = await searchSongs({ query })
			this.loading = false
			if (!data || error) {
				this.error = error
				return
			}

			this.songs = data.tracks?.items || []
		},
		onFilter() {
			if (!this.filter) {
				return
			}

			this.loadSongs(this.query)
		},
		getArtists({ artists }) {
			return artists.map(({ name }) => name).join()
		},
		getAlbumImage({ album }) {
			return album.images[0].url
		},
	},
}
</script>
