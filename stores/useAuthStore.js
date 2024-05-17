export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
        darkMode: false,
        authLoading: false,
        authFormLoading: false,
        isLogin: true,
    }),
    actions: {
        ACT_REGISTER_USER({ username, email, password, repeatPassword, name }) {
            return new Promise(async(resolve, reject) => {
                await $fetch('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        repeatPassword: repeatPassword,
                        name: name
                    })
                })
                .then((data) => {
                    resolve(data)
                })
                .catch(err => reject(err.data))
            })
        },
    },
    // persist: {
        // enabled: true,
    //     paths: ['authToken'],
    //     storage: persistedState.cookiesWithOptions({
    //         name: 'authStore',
    //         // httpOnly: true,
    //         sameSite: 'strict',
    //         // maxAge: new Date(Date.now() + 7200 * 1000),
    //         expires: new Date(Date.now() + 7200 * 1000),
    //         secure: process.env.NODE_ENV === 'production'
    //     })
    // }
})