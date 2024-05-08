export const useApi = (path, options = {}, pick = []) => {
    // console.log('options', options)
    const config = useRuntimeConfig();

    const xsrfToken = useCookie('XSRF-TOKEN')
    let headers = {
        accept: 'application/json',
        ...options?.headers,
    }
    if (xsrfToken && xsrfToken.value !== null) {
        headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    headers = {
        ...headers,
        ...useRequestHeaders(['cookie']),
        referer: config.public.apiHost
    }
    return useFetch(path, {
        baseURL: config.public.apiHost,
        headers,
        key: path,
        // credentials: 'include',
        ...options
    }, {
        pick
    })
}