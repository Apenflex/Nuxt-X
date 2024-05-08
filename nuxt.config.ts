// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            // apiHost: process.env.API_HOST,
            appHost: process.env.APP_HOST
        }
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
        '@nuxtjs/tailwindcss'
    ],
    // sitemap: {
    //     hostname: process.env.APP_HOST,
    //     gzip: true,
    //     routes: ['/']
    // },
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
