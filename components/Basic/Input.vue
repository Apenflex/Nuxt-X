<script setup>
const modelValue = defineModel('value', {
    type: String,
    default: ''
});

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    name: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: null
    },
});
</script>

<template>
    <div class="relative">
        <label 
            v-if="label"    
            :for="`input-${name}`"
            class="block pl-3 ml-px text-sm font-medium text-gray-700 "
        >
            {{ label }}
        </label>
        <div class="mt-1">
            <input
                v-model="modelValue"
                :id="`input-${name}`"
                :name="name"
                :placeholder="placeholder"
                :type="type"
                class="block px-4 w-full border-gray-500 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm defaultTransition"
            >
        </div>
        <p 
            v-if="error"
            class="absolute bottom-100 left-0  text-sm text-red-600"
        >
            {{ error }}
        </p>
    </div>
</template>
