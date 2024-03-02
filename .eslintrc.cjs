/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    //  правила
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-const': 'warn',
    // 'max-len': ['off'],
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
