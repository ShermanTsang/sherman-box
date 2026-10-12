import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['app/**/*.vue'],
    rules: {
      // The migration bridge resolves Options API bindings dynamically through `this`.
      // ESLint cannot see those references from setup scripts and templates.
      'no-unused-vars': 'off',
      // Preserve filenames already used as Nuxt auto-import component names.
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off'
    }
  },
  {
    ignores: ['app/assets/iconfont/iconfont.js']
  },
  {
    rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': 'off',
    'vue/comment-directive': 'off',
    'vue/html-self-closing': ['error', {
      html: { void: 'never', normal: 'any', component: 'any' },
      svg: 'always',
      math: 'always'
    }]
    }
  }
)
