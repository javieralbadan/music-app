import Vue from 'vue'

Vue.filter('duration', (value) => {
	const time = (value / 60000).toFixed(2)
	return `${time} min.`
})
