<script setup>
const darkMode = ref(false)
</script>

<template>
    <div :class="{ dark: darkMode }">
        <div class="bg-white dark:bg-dim-900">
        <!-- App -->
            <div 
                v-if="false" 
                class="min-h-full"
            >
                <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
                    <SidebarLeft />
                        <slot />
                    <SidebarRight />
                </div>
            </div>
            <AuthBlock v-else />
        </div>
    </div>
</template>
