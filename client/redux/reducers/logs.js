import axios from 'axios'

const GET_LOGS = 'GET_LOGS'

const initialState = {
  listOfLogs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        listOfLogs: action.logs
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return (dispatch) => {
    axios('/api/v1/logs').then(({ data: logs }) => {
      dispatch({
        type: GET_LOGS,
        logs
      })
    })
  }
}
