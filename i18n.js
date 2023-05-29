module.exports = {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    pages: {
        '/': ['landing', 'register'],
        '*': ['footer'],
        '/landing': ['landing', 'register'],
        '/404': ['404'],
        '/register': ['register']
    },
}
