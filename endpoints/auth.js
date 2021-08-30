export function signIn({ user, password }) {
	localStorage.setItem('user', user)
	localStorage.setItem('password', password)
}

export function signOut() {
	localStorage.removeItem('user')
	localStorage.removeItem('password')
}

export function getUser() {
	const data = localStorage.getItem('user')

	return { data }
}
