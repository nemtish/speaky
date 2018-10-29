/* eslint-disable no-console,no-new,max-len,no-unused-expressions */
import 'es6-promise/auto'
import axios from 'axios'
import store from '../store'

export default {

    init () {
        axios.defaults.baseURL = store.getters.get_api_url
        // axios.defaults.withCredentials
        // this.setAuthorizationHeader()
    },

    setAuthorizationHeader () {
        const token = store.getters.get_auth_token

        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        }
    },

    get (url) {
        return axios.get(url)
            .then(response => response.data)
            .catch((err) => { throw err })
    },
    post (url, data) {
        return axios.post(url, data)
            .then(response => response.data)
            .catch((err) => { throw err })
    },
    put (url, data) {
        return axios.put(url, data)
            .then(response => response.data)
            .catch((err) => { throw err })
    },
    delete (url) {
        return axios.delete(url)
            .then(response => response.data)
            .catch((err) => { throw err })
    },
    getFileLink (url) {
        return axios.get(url)
            .then((response) => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] })

                let filename = (response.headers['content-disposition'] || '').split('filename=')[1]
                filename = filename.split('"').join('')

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, filename)
                    return
                }

                const data = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = data
                link.download = filename // remove quotes from filename
                link.click()
            })
            .catch((err) => { throw err })
    }
}
