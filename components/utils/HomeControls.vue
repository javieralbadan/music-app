<template>
	<a-row type="flex" justify="center" align="middle" class="wrap-controls">
    <a-col :xs="24" :sm="20" :md="18" :lg="16">
			· Choose the singer ·
			<div class="wrap-singers">
				<a-button-group>
					<a-button
						v-for="(item, index) in singers"
						:key="index"
						:disabled="disabled"
						:type="query === item ? 'primary' : 'dashed'"
						@click="changeQuery(item)"
					>
						{{ item }}
					</a-button>
				</a-button-group>
			</div>

			<a-input-search
				v-model="filter"
				:disabled="disabled"
				placeholder="Filter your songs"
				size="large"
			>
				<a-button slot="enterButton" icon="filter" />
			</a-input-search>
		</a-col>
  </a-row>
</template>

<script>
export default {
	name: 'HomeControls',
	props: {
		disabled: Boolean,
	},
	data() {
		return {
			filter: '',
			singers: ['Aya Nakamura', 'J Balvin', 'Milky Chance', 'Vicente García'],
			query: '',
		}
	},
	watch: {
		filter() {
			this.$emit('set-filter', this.filter)
		},
	},
	created() {
		this.changeQuery(this.singers[0])
	},
	methods: {
		changeQuery(item) {
			this.query = item
			this.$emit('load-songs', item)
		},
	},
}
</script>

<style lang="scss" scoped>
.wrap-controls {
	.ant-col {
		text-align: center;
	}

	.wrap-singers {
		width: 100%;
		overflow-x: auto;
	}
}
</style>
