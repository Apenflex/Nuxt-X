<script setup>
const darkMode = ref(false)
// const store = useAuthStore()
</script>

<template>
    <div :class="{ dark: darkMode }">
        <div class="bg-white dark:bg-dim-900">
            <!-- Loading -->
            <!-- <AuthLoading
                v-if="store.authLoading"
            /> -->
            <!-- v-else -->
            <div 
            class="min-h-full">
                <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
                    <SidebarLeft />
                    <slot />
                    <SidebarRight />
                </div>
            </div>
        </div>
    </div>
</template>
