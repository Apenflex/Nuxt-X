<script setup>
definePageMeta({
    middleware: 'auth',
})

const { data, signOut } = useAuth()
const loading = ref(false)

const handdleLogout = async () => {
    // loading.value = true
    await signOut()
    // loading.value = false
}

// const { data } = await useFetch('/api/user')
</script>

<template>
    <main class="col-span-12 md:col-span-8 xl:col-span-6">
        <!-- <div> -->
        <MainSection
            title="home"
            :loading="loading"
        >
            this is our home page
            <pre>
                {{ data }}
            </pre>
        </MainSection>
        <!-- </div> -->
    </main>
    <button
        @click="handdleLogout"
        class="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
    >
        Logout
    </button>
</template>
