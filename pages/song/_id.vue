<template>
	<div class="slide">
		<a-page-header
      :title="song.name || 'Song'"
      @back="() => $router.push('/home')"
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

    <SongDetails v-else :song="song" />
</div>
</template>

<script>
import { getDetailSong } from '~/endpoints/songs'

export default {
	name: 'SongDetailPage',
	components: {
		SongDetails: () => import('~/components/songs/SongDetails.vue'),
	},
	layout: 'User',
	transition: 'slide',
	meta: {
		requiresAuth: true,
	},
	data() {
		return {
			id: this.$route.params.id,
			error: '',
			loading: true,
			song: {},
		}
	},
	created() {
		this.loadSong()
	},
	methods: {
		async loadSong() {
			const { data, error } = await getDetailSong({ id: this.id })
			this.loading = false
			this.error = error

			if (!data || error) {
				return
			}

			this.song = data
		},
	},
}
</script>
