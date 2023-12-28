module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
