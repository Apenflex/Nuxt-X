<script setup>
const store = useAuthStore()

const { signIn } = useAuth()
const handleSignIn = async (provider) => {
    store.authLoading = true
    await signIn(provider)
    store.authLoading = false
}

const providerBtn = ref([
    {
        provider: 'github',
        icon: 'mdi:github',
    },
    {
        provider: 'google',
        icon: 'mdi:google',
    }
])
</script>

<template>
    <div class="flex h-screen">
        <div class="relative flex-1 hidden w-0 lg:block">
            <img 
                src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
                alt="Auth Block"
                class="absolute inset-0 object-cover w-full h-full"
            />
        </div>
        <div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="flex flex-col items-center justify-center w-full h-full max-w-sm mx-auto lg:w-[260px] gap-1">
                <LoginForm v-if="store.isLogin" />
                <RegisterForm v-else/>
                <div class="text-sm text-gray-500">
                    or continue with
                </div>
                <div class="w-full flex justify-center gap-2">
                    <template v-for="btn in providerBtn">
                        <button 
                            class="w-full flex justify-center py-1 px-5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 defaultTransition"
                            @click="handleSignIn(btn.provider)"
                        >
                            <Icon :name="btn.icon" class="w-7 h-7" />
                        </button>
                    </template>
                </div>
                <div class="flex items-center justify-center gap-2 mt-1">
                    <div class="text-sm text-gray-500">
                        {{ store.isLogin ? 'Don\'t have account?' : 'Already have account?' }}
                    </div>
                    <button
                        class="text-blue-300 hover:underline text-sm"
                        @click="store.isLogin = !store.isLogin"
                    >
                        {{ store.isLogin ? 'Register' : 'Login' }}
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>
