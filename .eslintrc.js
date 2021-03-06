module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': 0,
        'indent': 'off',
        'arrow-parens': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'no-restricted-globals': 'off',
        'no-alert': 'off',
        'no-param-reassign': 'off',
    },
};
