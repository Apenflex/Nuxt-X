<script setup>

const store = useAuthStore()
const { signIn } = useAuth()

const { meta, handleSubmit, resetForm } = useForm()
const { value: email, errorMessage: emailError } = useField('Email', 'email')
const { value: password, errorMessage: passwordErrorMessage } = useField('Password', 'password')

const toast = useToast()
const onSubmit = handleSubmit(async() => {
    store.authLoading = true
    store.authFormLoading = true
    // console.log(email.value, password.value, 'email, password')
    const { error, url } = await signIn('credentials', {
        email: email.value,
        password: password.value,
        redirect: false
    })

    if (error) {
        toast.error(error)
    } else {
        resetForm()
        return navigateTo(url, { external: true })
    }
    store.authLoading = false
    store.authFormLoading = false
})

const showPassword = ref(false)
const passwordType = computed(() => showPassword.value ? 'text' : 'password')
</script>

<template>
    <div class="w-full">
        <form
            @submit.prevent="onSubmit"
            class="pt-5 space-y-6"
        >
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
                :type="passwordType"
                :error="passwordErrorMessage"
            >
                <template #icon>
                    <Icon 
                        :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" 
                        class="h-5 w-5 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        @click="showPassword = !showPassword"
                    />
                </template>
            </Input>
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
