module.exports = {
    plugins: ['prettier'],
    env: {
        browser: true,
        es2020: true,
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    extends: ['airbnb', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'max-len': [
            'error',
            {
                code: 130,
                ignoreUrls: true,
            },
        ],
        'max-params': ['error', 3],
        'no-var': 'error',
        'no-unreachable': 'error',
        'no-useless-return': 'error',
        'no-unused-vars': 'error',
    },
}
