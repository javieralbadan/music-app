export function songsTransform(data) {
	const getArtists = ({ artists = [] }) => artists.map(({ name }) => name).join(' · ')
	const getAlbumImage = ({ album = {} }) => album.images[0].url

	const { items = [], ...rest } = data?.tracks || {}
	const pagination = rest || {}

	const songs = items?.map((item) => {
		return {
			id: item.id,
			name: item.name,
			duration: item.duration_ms,
			explicit: item.explicit,
			href: item.href,
			popularity: item.popularity,
			artists: getArtists(item),
			picture: getAlbumImage(item),
			liked: false,
		}
	}) || []

	return {
		pagination,
		songs,
	}
}
