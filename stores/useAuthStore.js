export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
        authFormLoading: false,
        authToken: null,
        authUser: null,
    }),
    actions: {
        ACT_LOGIN_USER({ username, password }) {
            // console.log(username, password, 'ACT_LOGIN_USER')
            return new Promise(async(resolve, reject) => {
                await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                .then((data) => {
                    // console.log(data, 'ACT_LOGIN_USER')
                    this.authToken = data.access_token
                    this.authUser = data.user
                    resolve(data)
                })
                .catch(err => reject(err.data))
            })
        },
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
                    this.authToken = data.access_token
                    this.authUser = data.user
                    resolve(data)
                })
                .catch(err => reject(err.data))
            })
        },
        ACT_LOGOUT_USER() {
            this.authToken = null
            this.authUser = null
        }
    },
    persist: {
        enabled: true,
        paths: ['authToken', 'authUser'],
        storage: persistedState.cookiesWithOptions({
            name: 'authStore',
            // httpOnly: true,
            sameSite: 'strict',
            // maxAge: new Date(Date.now() + 7200 * 1000),
            expires: new Date(Date.now() + 7200 * 1000),
            secure: process.env.NODE_ENV === 'production'
        })
    }
})