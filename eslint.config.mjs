import standard from './eslint-standard.config.mjs'
import lintReact from 'eslint-plugin-react'
import jslint from '@eslint/js'
import lintReactHooks from 'eslint-plugin-react-hooks'
import tslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

const defaultConfig = {
  plugins: {
    react: lintReact,
    '@stylistic': stylistic,
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
    'react-hooks/exhaustive-deps': 'warn',
    // typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
}

export default defineConfig([
  // 只对我修改的部分进行
  {
    name: 'app/files-to-lint',
    settings: { react: { version: '18.3' } },
    files: ['./apps/nav-admin/**/*.{tsx,ts,js,mjs,jsx}', './apps/nav-server/**/*.{tsx,ts,js,mjs,jsx}', './*.{ts,js,mjs}']
  },
  // global ignores
  {
    name: 'app/files-to-ignore',
    ignores: ['**/temp.js', '**/.next/**', '**/node_modules/**', '**/nav-main/**']
  },
  jslint.configs.recommended,
  lintReact.configs.flat.recommended,
  lintReact.configs.flat['jsx-runtime'],
  standard, // js 标准配置
  ...tslint.configs.recommended,
  defaultConfig
])
