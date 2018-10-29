/* eslint-disable no-param-reassign */
import api from '../util/api'
import { LOAD_AUDIO, SAVE_AUDIO } from '../config/constants'

export default {
    [SAVE_AUDIO]: (context, audioData) => api.post('/audio/save', audioData).then((resp) => {
        context.commit(SAVE_AUDIO, resp)
        return resp
    }),
    [LOAD_AUDIO]: (context, hash) => api.get(`/audio/load?hash=${hash}`).then((resp) => {
        context.commit(LOAD_AUDIO, resp)
        return resp
    })
}
