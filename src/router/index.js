import Vue from 'vue'
import Router from 'vue-router'
import RecordAudio from '../components/page/RecordAudio.vue'
import AudioPlay from '../components/page/PlayAudio.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: RecordAudio
        },
        {
            path: '/:hash',
            name: 'Audio listen',
            component: AudioPlay
        }
    ]
})
