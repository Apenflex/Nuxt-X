// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            // apiHost: process.env.API_HOST,
            appHost: process.env.APP_HOST
        },
        AUTH_SECRET: process.env.AUTH_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    },
    css: ['@/assets/sass/app.scss'],
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon/favicon.ico'
                }
            ],
            htmlAttrs: {
                lang: 'uk'
            },
            script: []
        }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        'nuxt-icon',
        '@nuxtjs/sitemap',
        '@unlazy/nuxt',
        '@vee-validate/nuxt',
        '@nuxtjs/tailwindcss',
        '@pinia-plugin-persistedstate/nuxt',
        '@sidebase/nuxt-auth'
    ],
    auth: {
        globalAppMiddleware: true,
        baseURL: process.env.APP_HOST,
        // provider: {
        //     type: 'authjs'
        // }
    },
    build: { transpile: ['vue-toastification'] },
    $production: {
        nitro: {
            preset: 'vercel',
            // routeRules: {
            //     '/': {
            //         swr: 3600,
            //         headers: { 'cache-control': 's-maxage=86400' }
            //     },
            //     '/**': {
            //         swr: 3600,
            //         headers: { 'cache-control': 's-maxage=86400' }
            //     },
            //     '/**/**': {
            //         swr: 3600,
            //         headers: { 'cache-control': 's-maxage=86400' }
            //     }
            // },
            compressPublicAssets: true
        }
    },
    $development: {}
})