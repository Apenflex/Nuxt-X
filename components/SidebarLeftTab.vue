<script setup>
const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const textClasses = computed(() => (props.active ? 'font-semibold' : 'font-normal'))
</script>

<template>
    <NuxtLink
        to="#"
        class="flex items-center p-3 w-min rounded-full text-black
        hover:bg-gray-200 defaultTransition dark:hover:bg-dim-200 dark:text-white"
    >
        <div class="w-6 h-6 text-dark flex items-center justify-center">
            <slot name="icon" />
        </div>
        <div
            class="ml-4 text-xl hidden xl:block"
            :class="textClasses"
        >
            <slot name="name" />
        </div>
    </NuxtLink>
</template>
