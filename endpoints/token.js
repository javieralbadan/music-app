const BASE_URL = process.env.accountsBaseUrl

let lastExpired
let currentToken

export async function getToken() {
	const isTokenExpired = new Date() < lastExpired

	if (isTokenExpired) {
		return { data: currentToken, error: null }
	}

	const buff = Buffer.from(`${process.env.clientId}:${process.env.clientSecret}`)
	const authBase64 = buff.toString('base64')

	const headers = new Headers()
	headers.append('Authorization', `Basic ${authBase64}`)
	headers.append('Content-Type', 'application/x-www-form-urlencoded')

	const urlEncoded = new URLSearchParams()
	urlEncoded.append('grant_type', 'client_credentials')

	try {
		const response = await fetch(`${BASE_URL}/token`, {
			method: 'POST',
			headers,
			body: urlEncoded,
		})
		const data = await response.json()

		if (response.status !== 200 && data.error) {
			return { data: null, error: data.error.message }
		}

		const { access_token: accessToken, expires_in: expiresIn } = data
		saveToken(accessToken, expiresIn)

		return { data: accessToken, error: null }
	} catch (error) {
		return { data: null, error: 'There was an error retrieving the access token' }
	}
}

function saveToken(accessToken, expiresIn) {
	lastExpired = new Date()
	lastExpired.setSeconds(expiresIn)
	currentToken = accessToken
}
