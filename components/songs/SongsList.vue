<template>
	<div>
		<a-list item-layout="horizontal" :data-source="finalSongs">
			<a-list-item slot="renderItem" slot-scope="item">
				<a-button slot="actions" type="dashed" shape="circle" icon="heart" />
				<a-list-item-meta :description="item.artists">
					<span slot="title">{{ item.name }}</span>
					<a-avatar slot="avatar" :src="item.picture" />
				</a-list-item-meta>
			</a-list-item>
		</a-list>

		<a-pagination
			v-if="showPagination"
			v-model="currentPagination"
			:default-current="1"
			:total="total"
			:show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
			:page-size="20"
			@change="onPaginate"
		/>
	</div>
</template>

<script>
import Fuse from 'fuse.js'

const LIMIT = 20
const MAX_LIMIT_API = 1000
const FUSE_THRESHOLD = 0.3

export default {
	name: 'SongsList',
	props: {
		filter: { type: String, default: '' },
		pagination: { type: Object, default: () => ({}) },
		songs: { type: Array, default: () => [] },
	},
	data() {
		return {
			currentPagination: 1,
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
			return this.finalSongs.length && !this.filter
		},
		total() {
			return this.pagination.total <= MAX_LIMIT_API ? this.pagination.total : MAX_LIMIT_API
		},
	},
	methods: {
		onPaginate(newCurrent) {
			this.currentPagination = newCurrent
			const offset = (this.currentPagination - 1) * LIMIT
			this.$emit('set-offset', offset)
		},
	},
}
</script>
