export const useStore = defineStore('useStore', {
    state: () => ({}),
    actions: {
        ACT_LOGIN_USER({ username, password }) {
            console.log(username, password, 'ACT_LOGIN_USER')
            return new Promise(async(resolve, reject) => {
                await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                    // {
                    //     username: username,
                    //     password: password
                    // }
                })
                .then(() => resolve())
                .catch(err => reject(err))
            })
        }
    }
})