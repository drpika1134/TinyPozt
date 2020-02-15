const initialState = {
  isAuthenticated: false
}
function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, isAuthenticated: false }
    case 'SET_AUTH':
      return { ...state, isAuthenticated: action.payload.auth }
    case 'LOGIN_ERROR':
    default:
      return state
  }
}
export default authReducer
