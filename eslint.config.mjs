import standard from './eslint-standard.config.mjs'
import lintReact from 'eslint-plugin-react'
import pluginVue from 'eslint-plugin-vue'
import jslint from '@eslint/js'
import lintReactHooks from 'eslint-plugin-react-hooks'
import tslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

const tsLintConfig = {
  name: 'ts-files-lint',
  // files: ['./apps/nav-server/**/*.{tsx,ts,js,mjs,jsx}'],
  rules: {
    // typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
}

const reactLintConfig = {
  name: 'app/react-files-lint',
  files: ['./apps/nav-admin/**/*.{tsx,ts,js,mjs,jsx}'],
  plugins: {
    react: lintReact,
    'react-hooks': lintReactHooks
  },

  settings: { react: { version: '18.3' } },
  rules: {
    // 对引入的内容进行排序：是否忽略大小写
    // 'sort-imports': ["error", { "ignoreCase": false }],
    // 交给 tslint 处理
    // 'no-unused-vars': 'off',
    // 异步处理
    // react
    'react/no-this-in-sfc': 1,
    'react/prop-types': 0,
    'react/display-name': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}

const vueLintConfig = {
  name: 'app/vue-files-lint',
  files: ['./apps/nav-page/**/*.{tsx,ts,js,vue}'],
  plugins: {
    vue: pluginVue
  },
  rules: {
    // typescript
    // vue 错误
    'vue/no-unused-vars': 1,
    // 'vue/indent': ['warn', 2],
    'vue/component-tags-order': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': ['warn', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: []
    }],
    'vue/no-multiple-template-root': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0
  }
}

export default defineConfig([
  // 只对我修改的部分进行
  {
    name: 'app/files-to-lint',
    settings: { react: { version: '18.3' } },
    files: ['./apps/nav-admin/**/*.{tsx,ts,js,mjs,jsx}', './apps/nav-server/**/*.{tsx,ts,js,mjs,jsx}']
  },
  // global ignores
  {
    name: 'app/files-to-ignore',
    ignores: ['**/temp.js', '**/.next/**', '**/node_modules/**', '**/dist/**']
  },
  jslint.configs.recommended,
  standard, // js 标准配置
  lintReact.configs.flat.recommended,
  lintReact.configs.flat['jsx-runtime'],
  ...pluginVue.configs['flat/essential'],
  ...tslint.configs.recommended,
  defineConfigWithVueTs(vueTsConfigs.recommended),
  tsLintConfig,
  reactLintConfig,
  vueLintConfig
])
