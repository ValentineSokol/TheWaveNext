module.exports = {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    pages: {
        '/': ['landing', 'register'],
        '*': ['common', 'navbar', 'footer', 'register'],
        '/landing': ['landing', 'register'],
        '/404': ['404'],
        '/register': ['register']
    },
}
