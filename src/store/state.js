
export default {
    api_base_url: 'api-url',
    auth_token: sessionStorage.getItem('user-token') || null,
    current_user: JSON.parse(sessionStorage.getItem('current-user')) || null
}
