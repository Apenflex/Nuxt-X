<script setup>
definePageMeta({
    layout: false,
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
})
const store = useAuthStore()
</script>
<template>
    <AuthLoading v-if="store.authLoading" />
    <AuthBlock v-else />
</template>
