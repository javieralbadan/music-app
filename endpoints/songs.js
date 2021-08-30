import { getToken } from './token'
import { songsTransform } from '~/transforms/songs'

const BASE_URL = process.env.apiBaseUrl
const TYPE = 'track'
const LIMIT = 20

export async function searchSongs({ query, type = TYPE, limit = LIMIT, offset = 0 }) {
	const { data: accessToken, error } = await getToken()
	if (error && !accessToken) {
		return { data: null, error }
	}

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	headers.append('Authorization', `Bearer ${accessToken}`)

	try {
		const response = await fetch(`${BASE_URL}/v1/search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`, {
			method: 'GET',
			headers,
		})
		const data = await response.json()

		if (response.status !== 200 && data.error) {
			return { data: null, error: data.error.message }
		}

		return { data: songsTransform(data), error: null }
	} catch (error) {
		return { data: null, error: 'There was an error retrieving songs' }
	}
}

export function getLikedSongs() {
	const songs = localStorage.getItem('likedSongs')

	let data = []
	if (songs) {
		data = JSON.parse(songs)
		data = Object.values(data)
	}

	return { data }
}

export function saveLikedSong(item) {
	const songs = localStorage.getItem('likedSongs')

	let parsedSongs = {}
	if (songs) {
		parsedSongs = JSON.parse(songs)
	}

	const finalObject = {
		...parsedSongs,
		[item.id]: item,
	}
	const objectToStore = JSON.stringify(finalObject)
	localStorage.setItem('likedSongs', objectToStore)

	return { data: Object.values(finalObject) }
}
