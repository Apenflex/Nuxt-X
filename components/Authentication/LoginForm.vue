<script setup>
const store = useAuthStore()

const { meta, handleSubmit, resetForm } = useForm()
const { value: username, errorMessage: usernameError } = useField('User Name', 'required')
const { value: password, errorMessage: passwordErrorMessage } = useField('Password', 'password')

const toast = useToast()
const onSubmit = handleSubmit(() => {
    store.authLoading = true
    // store.authFormLoading = true
    store
        .ACT_LOGIN_USER({
            username: username.value,
            password: password.value
        })
        .then(() => {
            resetForm()
            // console.log('login success')
            store.authLoading = false
            // store.authFormLoading = false
        })
        .catch(error => {
            toast.error(error.message)
            store.authLoading = false
            // store.authFormLoading = false
        })
})
</script>

<template>
    <div class="w-full">
        <form
            @submit.prevent="onSubmit"
            class="pt-5 space-y-6"
        >
            <Input
                v-model:value="username"
                name="username"
                label="User Name"
                placeholder="@username"
                :error="usernameError"
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
            >
                Login
            </button>
        </form>
    </div>
</template>
