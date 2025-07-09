import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
    },
    rules: {
      'no-unused-vars': 1, // 未使用的变量
      'comma-dangle': 0,
      'space-before-function-paren': 0, // function 前面的空格
      eqeqeq: 1, // 必须使用全等
      semi: [2, 'never'], // 语句不使用分号结尾
      quotes: [ // 引号类型 `` "" ''
        2,
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      'no-irregular-whitespace': 2, // 不能有不规则的空格
      'eol-last': 0, // 所有文件结尾必须包括换行
      'no-else-return': 2, // 如果 if 语句里面有 return 后面不能跟 else 语句
      'max-lines-per-function': [ // 每个方法最多多少行
        2,
        { max: 300, skipComments: true, skipBlankLines: true }
      ],
      'no-confusing-arrow': 2,
      'no-nested-ternary': 2,
      'no-console': 1,
      'no-debugger': 1, // 使用 debugger 会警告
      'no-multiple-empty-lines': [2, { max: 2 }], // 空行最多不能超过2行
      'no-multi-spaces': 2, // 不能用多余的空格
      'no-trailing-spaces': 2, // 一行结束后面不要有空格
      'no-proto': 1, // 禁止使用__proto__属性
      'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
      'no-param-reassign': [
        2,
        { props: true, ignorePropertyModificationsFor: ['draft'] }
      ],
      // 异步处理
      'no-promise-executor-return': 2, // 禁止 promise 中使用 return
      'no-await-in-loop': 2, // 禁止循环中使用 await
      'max-nested-callbacks': ['error', 3], // 异步最大回调数
      'no-return-await': 2,
      'prefer-promise-reject-errors': 2, // 使用 new Error 追踪错误
      'func-call-spacing': 0,

      // typescript
      'no-undef': 0, // 未命名变量不报错：当未命名变量的检查交给 ts 类型检查器时使用
      '@typescript-eslint/no-explicit-any': 1, // 使用 any 时警告
      '@typescript-eslint/no-this-alias': 0, // 是否禁止 this 的别名
      '@typescript-eslint/no-unused-vars': 1, // 是否禁止 this 的别名
      indent: ['warn', 2]
    }
  }
)
