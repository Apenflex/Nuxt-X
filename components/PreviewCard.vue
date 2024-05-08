
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="m-2 border bg-gray-50 rounded-2xl">
        {{ title }}
    </div>
</template>
