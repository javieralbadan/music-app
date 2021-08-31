<template>
	<div>
		<a-list item-layout="horizontal" :data-source="finalSongs">
			<a-list-item slot="renderItem" slot-scope="item">
				<a-button
					v-if="showLikeButton"
					slot="actions"
					shape="circle"
					icon="heart"
					:type="getType(item)"
					@click="$emit('like-song', item)"
				/>
				<a-list-item-meta :description="item.artists">
					<nuxt-link slot="title" :to="`/song/${item.id}`">{{ item.name }}</nuxt-link>
					<a-avatar slot="avatar" :src="item.picture" :size="48" />
				</a-list-item-meta>
			</a-list-item>
		</a-list>

		<a-row type="flex" justify="center" align="middle" class="wrap-pagination">
			<a-col :xs="24">
				<a-pagination
					v-if="showPagination"
					:current="currentPagination"
					:default-current="1"
					:total="total"
					:show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
					:page-size="20"
					@change="onPaginate"
				/>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import Fuse from 'fuse.js'
import { getLikedSongs } from '~/endpoints/songs'

const LIMIT = 20
const MAX_LIMIT_API = 1000
const FUSE_THRESHOLD = 0.3

export default {
	name: 'SongsList',
	props: {
		filter: { type: String, default: '' },
		pagination: { type: Object, default: () => null },
		songs: { type: Array, default: () => [] },
		showLikeButton: Boolean,
	},
	data() {
		return {
			likedSongs: [],
		}
	},
	computed: {
		finalSongs() {
			if (!this.filter) {
				return this.songs
			}

			const options = {
				keys: ['name', 'artists'],
				threshold: FUSE_THRESHOLD,
			}
			const fuse = new Fuse(this.songs, options)

			const results = fuse.search(this.filter)
			return results.map(({ item }) => item)
		},
		showPagination() {
			return this.pagination && this.finalSongs.length && !this.filter
		},
		total() {
			return this.pagination.total <= MAX_LIMIT_API ? this.pagination.total : MAX_LIMIT_API
		},
		currentPagination() {
			return this.pagination.offset / LIMIT || 1
		},
	},
	created() {
		this.getLikedSongs()
	},
	methods: {
		getLikedSongs() {
			const { data } = getLikedSongs()
			this.likedSongs = data || []
		},
		onPaginate(newCurrent) {
			const offset = newCurrent * LIMIT
			this.$emit('set-offset', offset)
		},
		getType({ liked, id: itemId }) {
			const LIKED_STYLE = 'primary'
			const NO_LIKED_STYLE = 'dashed'

			if (liked) {
				return LIKED_STYLE
			}

			const isLiked = this.likedSongs.find(({ id }) => itemId === id)
			return isLiked ? LIKED_STYLE : NO_LIKED_STYLE
		},
	},
}
</script>

<style lang="scss" scoped>
.wrap-pagination {
	margin: 1rem;

	.ant-col {
		text-align: center;
	}
}
</style>
