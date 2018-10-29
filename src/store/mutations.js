/* eslint-disable no-param-reassign */
import { LOAD_AUDIO, SAVE_AUDIO } from '../config/constants'

export default {
    [SAVE_AUDIO] (state, audio) {
        state.last_saved_audio = audio
    },
    [LOAD_AUDIO] (state, audio) {
        state.loaded_audio = audio
    }
}
