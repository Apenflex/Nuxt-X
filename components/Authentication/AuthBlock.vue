<script setup>
const isLogin = ref(true)
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
                <LoginForm v-if="isLogin"/>
                <RegisterForm v-else/>
                or
                <button
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 defaultTransition"
                    @click="isLogin = !isLogin"
                >
                    {{ isLogin ? 'Register' : 'Login' }}
                </button>
            </div>
        </div>
    </div>
</template>
