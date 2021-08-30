import { getUser } from '~/endpoints/auth'

export default function({ redirect, route }) {
	const { data } = getUser()

	if (!data) {
		if (requiresAuth(route)) {
			redirect('/')
		}

		return
	}

	if (route.name === 'index') {
		redirect('/home')
	}
}

const requiresAuth = ({ meta }) => meta[0]?.requiresAuth
