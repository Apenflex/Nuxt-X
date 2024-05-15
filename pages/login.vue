<script setup>
definePageMeta({
    layout: false,
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
})
const { status, signIn, signOut } = useAuth()
const handleSignIn = async () => {
    await signIn('github')
}
</script>
<template>
    <div>
        <AuthBlock />
        <button 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 defaultTransition"
            @click="handleSignIn"
        >
            Sign in
        </button>
    </div>
</template>
