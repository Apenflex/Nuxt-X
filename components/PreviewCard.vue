
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="m-2 border bg-gray-50 dark:bg-dim-700 rounded-2xl twitterBorderColor overflow-hidden">
            <div class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white">
                {{ title }}
            </div>
            <slot />
            <div class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 defaultTransition">
                Show more
            </div>
    </div>
</template>
