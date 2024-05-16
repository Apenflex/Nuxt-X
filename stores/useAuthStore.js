export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
        authLoading: false,
        authFormLoading: false,
        isLogin: true,
    }),
    actions: {
        // ACT_LOGIN_USER({ username, password }) {
        //     // console.log(username, password, 'ACT_LOGIN_USER')
        //     return new Promise(async(resolve, reject) => {
        //         await $fetch('/api/auth/login', {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 username: username,
        //                 password: password
        //             })
        //         })
        //         .then((data) => {
        //             // console.log(data, 'ACT_LOGIN_USER')
        //             // this.authToken = data.access_token
        //             // this.authUser = data.user
        //             resolve(data)
        //         })
        //         .catch(err => reject(err.data))
        //     })
        // },
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
                    // this.authToken = data.access_token
                    // this.authUser = data.user
                    resolve(data)
                })
                .catch(err => reject(err.data))
            })
        },
        // ACT_REFRESH_TOKEN() {
        //     return new Promise(async (resolve, reject) => {
        //         await $fetch('/api/auth/refresh')
        //         .then((data) => {
        //             this.authToken = data.access_token
        //             resolve(data)
        //         })
        //         .catch(err => reject(err.data))
        //     })
        // },
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