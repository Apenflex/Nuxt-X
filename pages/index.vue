<script setup>
definePageMeta({
    middleware: 'auth',
})
const store = useAuthStore()
const { signOut, getSession } = useAuth()
const session = await getSession()
// console.log(session, 'session')
const loading = ref(false)

const handdleLogout = async () => {
    store.authLoading = true
    await signOut()
    store.authLoading = false
}

// const { data } = await useFetch('/api/user')
</script>

<template>
    <main class="col-span-12 md:col-span-8 xl:col-span-6">
        <MainSection
            title="home"
            :loading="false"
        >
            this is our home page
            <pre>
                <!-- {{ data }} -->
                <!-- {{ status }} -->
                {{ session?.user }}
            </pre>
        </MainSection>
    </main>
    <button
        @click="handdleLogout"
        class="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
    >
        Logout
    </button>
</template>
