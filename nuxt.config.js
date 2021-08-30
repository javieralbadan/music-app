export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	env: {
		apiBaseUrl: process.env.API_BASE_URL || '',
		accountsBaseUrl: process.env.ACCOUNTS_BASE_URL || '',
		clientId: process.env.CLIENT_ID || '',
		clientSecret: process.env.CLIENT_SECRET || '',
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'music-app',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'keywords', content: 'Spotify API, challenge' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'theme-color', content: '#00D1B2' },
			{ name: 'msapplication-navbutton-color', content: '#00D1B2' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: '#00D1B2' },
			{ property: 'og:site_name', content: 'Music App' },
			{ property: 'og:title', content: 'Music App' },
			{ property: 'og:type', content: 'webapp' },
			// { property: 'og:url', content: 'https://z-bets.web.app/' },
			{ property: 'og:image', content: '/favicon.png' },
			{ property: 'og:description', content: 'Spotify API challenge' },
			{ property: 'og:locale', content: 'es_CO' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'ant-design-vue/dist/antd.css',
		'~/assets/scss/main.scss',
		'~/assets/scss/overrides.scss',
	],

	router: {
		middleware: 'router-auth',
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/antd-ui',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},
}
