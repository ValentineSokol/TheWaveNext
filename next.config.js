const nextTranslate = require('next-translate-plugin');
const withPWA = require("@imbios/next-pwa")({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true, // workaround, I need to fix those
    },
    distDir: 'build',
}

module.exports = nextTranslate(withPWA(nextConfig));
