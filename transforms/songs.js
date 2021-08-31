const getArtists = ({ artists = [] }) => artists.map(({ name }) => name).join(' · ')
const getAlbumImage = ({ album = {} }) => album.images[0].url

export const detailTransform = (item) => ({
	id: item.id,
	name: item.name,
	duration: item.duration_ms,
	explicit: item.explicit,
	href: item.href,
	popularity: item.popularity,
	artists: getArtists(item),
	picture: getAlbumImage(item),
	liked: false,
})

export function songsTransform(data) {
	const { items = [], ...rest } = data?.tracks || {}
	const pagination = rest || {}

	const songs = items?.map((item) => detailTransform(item)) || []

	return {
		pagination,
		songs,
	}
}
