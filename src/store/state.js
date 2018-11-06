
export default {
    api_base_url: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1' : 'https://localhost:8000/api/v1',
    auth_token: sessionStorage.getItem('user-token') || null,
    current_user: JSON.parse(sessionStorage.getItem('current-user')) || null,
    last_saved_audio: null,
    loaded_audio: null
}
