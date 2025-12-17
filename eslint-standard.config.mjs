import pluginImport from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'
import stylistic from '@stylistic/eslint-plugin'

export default {
  // files: ['**/*.{js,mjs,cjs}'],
  // ignores: ['**/temp.js', '**/release/**/*.js'],
  plugins: {
    '@stylistic': stylistic,
    import: pluginImport,
    promise: pluginPromise
  },
  rules: {
    'no-var': 'warn',
    'object-shorthand': ['warn', 'properties'],
    'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': ['error', {
      allowImplicit: false,
      checkForEach: false
    }],

    camelcase: ['error', {
      allow: ['^UNSAFE_'],
      properties: 'never',
      ignoreGlobals: true
    }],
    curly: ['error', 'multi-line'],
    'default-case-last': 'error',
    'dot-notation': ['error', { allowKeywords: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 必须使用全等
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 对象属性 : 前后的空格
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-debugger': 'warn',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-object-constructor': 'error',
    'no-new-native-nonconstructor': 'error', // 不需要 new 的构造函数不用 new，比如 Symbol
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error', // 禁止使用__proto__属性
    'no-return-assign': ['error', 'except-parens'],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-sparse-arrays': 'error', // 禁止稀疏数组， [1,,2]
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable-loop': 'error',
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
    'no-unused-vars': ['error', {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      vars: 'all'
    }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'one-var': ['error', { initialized: 'never' }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-promise-reject-errors': 'error', // 使用 new Error 追踪错误
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'symbol-description': 'error',
    'unicode-bom': ['error', 'never'],
    'no-promise-executor-return': 1, // 禁止 promise 中使用 return
    'no-await-in-loop': 2, // 禁止循环中使用 await
    'no-else-return': 2, // 如果 if 语句里面有 return 后面不能跟 else 语句
    'max-nested-callbacks': ['error', 4], // 最大回调嵌套数
    'max-lines-per-function': [
      2,
      { max: 300, skipComments: true, skipBlankLines: true }
    ],
    'no-nested-ternary': 2,
    'no-console': 1,
    'no-param-reassign': [
      2,
      { props: true, ignorePropertyModificationsFor: ['draft'] }
    ],
    yoda: ['error', 'never'],
    // stylistic 配置
    '@stylistic/indent': [1, 2, { SwitchCase: 1 }], // 两个空格表示换行
    '@stylistic/keyword-spacing': ['error', { before: true, after: true }], // 关键字前后要加空格
    '@stylistic/yield-star-spacing': ['error', 'both'],
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
    '@stylistic/block-spacing': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }], // 大括号开始需要在行的结尾
    '@stylistic/comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    '@stylistic/comma-spacing': ['error', { before: false, after: true }],
    '@stylistic/comma-style': ['error', 'last'],
    '@stylistic/eol-last': 'error',
    '@stylistic/space-in-parens': ['error', 'never'],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
    '@stylistic/generator-star-spacing': ['error', { before: true, after: true }],
    '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@stylistic/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/new-parens': 'error',
    '@stylistic/no-confusing-arrow': 2,
    '@stylistic/no-extra-parens': ['error', 'functions'],
    '@stylistic/no-floating-decimal': 'error',
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-tabs': 'error',
    '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: "never" }],
    '@stylistic/quote-props': ['error', 'as-needed', { numbers: true }],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/no-trailing-spaces': 'error', // 行尾不能有多余空格
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/rest-spread-spacing': ['error', 'never'],
    '@stylistic/semi': ['warn', 'never'], // 语句不使用分号结尾
    '@stylistic/semi-spacing': ['error', { before: false, after: true }],
    '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    // '@stylistic/space-before-function-paren': ['error', 'always'], // 该配置和 vue 插件的格式化冲突
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
    '@stylistic/padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],
    '@stylistic/no-multiple-empty-lines': ['error', { max: 2 }], // 空行最多不能超过2行
    '@stylistic/no-mixed-operators': ['error', {
      groups: [
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true
    }],
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
    '@stylistic/spaced-comment': ['error', 'always', {
      line: { markers: ['*package', '!', '/', ',', '='] },
      block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
    }],
    '@stylistic/template-curly-spacing': ['error', 'never'],
    '@stylistic/template-tag-spacing': ['error', 'never'],
    '@stylistic/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
    'import/no-anonymous-default-export': 'off', // 禁止匿名函数导出
    'import/export': 'error',
    'import/first': 'error',
    'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-deprecated': 'warn', // 禁止引入带有 @deprecated 标志的方法
    'import/no-amd': 'error', // 禁止 amd 导入
    'import/no-commonjs': 'error', // 禁止 cjs 导入和导出
    ...pluginPromise.configs['flat/recommended'].rules,
    'promise/param-names': 'error',
    'promise/always-return': 0
  }
}
