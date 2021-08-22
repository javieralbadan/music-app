module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended',
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		'arrow-parens': ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		indent: ['error', 'tab', {
			ignoredNodes: ['TemplateLiteral'],
		}],
		'max-len': ['error', { code: 120 }],
		'no-empty-pattern': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'object-curly-spacing': ['error', 'always'],
		'prefer-template': 1,
		'space-before-function-paren': ['error', 'never'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'template-curly-spacing': 'off',
		'vue/html-indent': 'off',
		'vue/singleline-html-element-content-newline': 'off',
	},
}
