<script setup>
const darkMode = ref(false)
const store = useAuthStore()
</script>

<template>
    <div :class="{ dark: darkMode }">
        <div class="bg-white dark:bg-dim-900">
            <!-- Loading -->
            <AuthLoading
                v-if="store.authLoading"
            />
            <!-- App -->
            <div
                v-else-if="store.authToken"
                class="min-h-full"
            >
                <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
                    <SidebarLeft />
                    <slot />
                    <SidebarRight />
                </div>
                <button
                    @click="store.ACT_LOGOUT_USER"
                    class="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
                >
                    Logout
                </button>
            </div>
            <AuthBlock v-else />
        </div>
    </div>
</template>
