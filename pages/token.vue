<script setup>
definePageMeta({
    layout: false
})
const headers = useRequestHeaders(['cookie'])

const { data: token } = await useFetch('/api/token', { headers })
</script>

<template>
    <div>
        <pre>
            {{ token || 'No token'}}
        </pre>
    </div>
</template>
