const USERNAME = {
	MIN: 6,
	MAX: 15,
}
const PASSWORD = {
	MIN: 6,
	MAX: 10,
}

export const LOGIN_FORM = {
	user: [
		{
			required: true,
			message: 'Please input your username!',
			trigger: 'blur',
		},
		{
			min: USERNAME.MIN,
			max: USERNAME.MAX,
			message: `Length should be ${USERNAME.MIN} to ${USERNAME.MAX}`,
			trigger: 'blur',
		},
	],
	password: [
		{
			required: true,
			message: 'Please input your Password!',
			trigger: 'blur',
		},
		{
			min: PASSWORD.MIN,
			max: PASSWORD.MAX,
			message: `Length should be ${PASSWORD.MIN} to ${PASSWORD.MAX}`,
			trigger: 'blur',
		},
	],
}
