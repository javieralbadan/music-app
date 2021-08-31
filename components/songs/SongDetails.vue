<template>
	<div>
		<a-carousel>
      <img :src="song.picture" :alt="song.name" class="album-image">
    </a-carousel>
    <a-list item-layout="horizontal">
      <a-list-item>
        <a-icon type="tag" style="color: #888" />
        {{ song.name }}
      </a-list-item>
      <a-list-item>
        <a-icon type="user" style="color: #888" />
        {{ song.artists }}
      </a-list-item>
      <a-list-item>
        <a-icon type="clock-circle" style="color: #888" />
        {{ song.duration | duration }}
      </a-list-item>
      <a-list-item>
        <a-tag :color="song.explicit ? 'red' : 'blue'">
          <a-icon :type="song.explicit ? 'warning' : 'check'" style="color: #888" />
          {{ song.explicit ? 'Explicit' : 'Non-explicit' }}
        </a-tag>
      </a-list-item>
    </a-list>
	</div>
</template>

<script>
export default {
	name: 'SongDetails',
	props: {
		song: { type: Object, required: true },
	},
}
</script>

<style lang="scss" scoped>
.album-image {
  width: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0 0 1rem 1rem;
}
</style>
