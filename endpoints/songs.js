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
