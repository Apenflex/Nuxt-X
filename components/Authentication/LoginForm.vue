<script setup>

const store = useAuthStore()

const { signIn } = useAuth()

const { meta, handleSubmit, resetForm } = useForm()
const { value: email, errorMessage: emailError } = useField('Email', 'email')
// const { value: username, errorMessage: usernameError } = useField('User Name', 'required')
const { value: password, errorMessage: passwordErrorMessage } = useField('Password', 'password')

const toast = useToast()
const onSubmit = handleSubmit(async() => {
    // store.authLoading = true
    store.authFormLoading = true
    console.log(email.value, password.value, 'email, password')
    const { error, url } = await signIn('credentials', {
        email: email.value,
        // username: username.value,
        password: password.value,
        redirect: false
    })

    if (error) {
        toast.error(error)
    } else {
        resetForm()
        return navigateTo(url, { external: true })
    }
    // store.authLoading = false
    store.authFormLoading = false
})
</script>

<template>
    <div class="w-full">
        <form
            @submit.prevent="onSubmit"
            class="pt-5 space-y-6"
        >
            <!-- <Input
                v-model:value="username"
                name="username"
                label="User Name"
                placeholder="@username"
                :error="usernameError"
            /> -->
            <Input
                v-model:value="email"
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                :error="emailError"
            />
            <Input
                v-model:value="password"
                name="password"
                label="Password"
                placeholder="**********"
                type="password"
                :error="passwordErrorMessage"
            />
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 defaultTransition"
                :class="store.authFormLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'"
                :disabled="store.authFormLoading"
            >
                Login
            </button>
        </form>
    </div>
</template>
