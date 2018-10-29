
export default {
    api_base_url: 'http://localhost:8000',
    auth_token: sessionStorage.getItem('user-token') || null,
    current_user: JSON.parse(sessionStorage.getItem('current-user')) || null,
    last_saved_audio: null,
    loaded_audio: null
}
