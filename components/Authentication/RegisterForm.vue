<script setup>
const store = useAuthStore()

const { meta, handleSubmit, resetForm } = useForm()

const { value: name, errorMessage: nameError } = useField('Name', 'required')
const { value: email, errorMessage: emailError } = useField('Email', 'emailAndRequired')
const { value: username, errorMessage: usernameError } = useField('User Name', 'required')
const { value: password, errorMessage: passwordErrorMessage } = useField('password', 'password')
const { value: repeatPassword, errorMessage: repeatPasswordErrorMessage } = useField(
    'Confirm',
    'repeatPassword:password'
)
const toast = useToast()
const onSubmit = handleSubmit(() => {
    // store.authLoading = true
    store.authFormLoading = true

    store
        .ACT_REGISTER_USER({
            name: name.value,
            email: email.value,
            username: username.value,
            password: password.value,
            repeatPassword: repeatPassword.value
        })
        .then(() => {
            resetForm()
            toast.success('Registration successful')
            store.isLogin = true
            // store.authLoading = false
            store.authFormLoading = false
        })
        .catch(error => {
            toast.error(error.message)
            // store.authLoading = false
            store.authFormLoading = false
        })
})
</script>
<template>
    <div class="w-full">
        <form
            @submit.prevent="onSubmit"
            class="pt-5 space-y-3"
        >
            <Input
                v-model:value="name"
                name="name"
                label="Name"
                placeholder="Name"
                :error="usernameError"
            />
            <Input
                v-model:value="email"
                name="email"
                label="Email"
                placeholder="Email"
                :error="emailError"
            />
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
            <Input
                v-model:value="repeatPassword"
                name="passwordConfirmation"
                label="Password Confirmation"
                placeholder="**********"
                type="password"
                :error="repeatPasswordErrorMessage"
            />
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 defaultTransition"
                :class="store.authFormLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'"
                :disabled="store.authFormLoading"
            >
                Submit
            </button>
        </form>
    </div>
</template>
