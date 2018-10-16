
export default {
    // Global config
    get_api_url: state => state.api_base_url,
    // Authentication
    get_current_user: state => state.current_user,
    is_authenticated: state => !!state.auth_token,
    get_auth_token: state => state.auth_token
}
