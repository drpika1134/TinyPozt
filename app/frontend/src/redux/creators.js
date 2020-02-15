function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function createAction(type, ...argsName) {
  return function(...args) {
    let action = { type, payload: {} }
    argsName.forEach((name, index) => {
      action.payload[name] = args[index]
    })
    return action
  }
}

export { createReducer, createAction }
