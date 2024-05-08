<script setup>
const config = useRuntimeConfig()
const route = useRoute()
useCustomHead(config.public?.appHost, route.path)
useSeoMeta({
    title: 'HomePage',
    ogTitle: 'HomePage',
    description: 'HomePage',
    ogDescription: 'HomePage'
})
</script>

<template>
    <main class="home-page">
        <div class="container">Home Page</div>
    </main>
</template>
