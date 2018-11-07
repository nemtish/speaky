
export default {
    base_url: process.env.ROOT_API_URL,
    api_url: '/api/v1',
    auth_token: sessionStorage.getItem('user-token') || null,
    current_user: JSON.parse(sessionStorage.getItem('current-user')) || null,
    last_saved_audio: null,
    loaded_audio: null
}
