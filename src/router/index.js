import Vue from 'vue'
import Router from 'vue-router'
import AudioRecorder from '../components/page/AudioRecorder.vue'
import AudioPlayer from '../components/page/AudioPlayer.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Audio Recorder',
            component: AudioRecorder
        },
        {
            path: '/:hash',
            name: 'Audio Player',
            component: AudioPlayer
        }
    ]
})
