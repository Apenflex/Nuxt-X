<script setup>
definePageMeta({
    layout: false,
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
})
</script>
<template>
    <div>
        <AuthBlock />
        
    </div>
</template>
