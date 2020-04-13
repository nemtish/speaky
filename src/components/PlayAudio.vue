<!--eslint-disable-->
<template>
  <div>
    <timer
      v-if="showTimer"
      ref="timer"
      :count-down="countDown"
      :start-at="startTimerAt"
      @countdown-finish="countDownFinishHandler" />

    <media-button
      ref="mediaButton"
      :name="mediaBtnIcon"
      @play="playHandler"
      @pause="pauseHandler" />
  </div>
</template>
<!--eslint-enable-->
<script>
import { audioActions } from '../config/constants'
import MediaButton from './MediaButton.vue'
import Timer from './Timer.vue'

export default {
    components: {
        MediaButton,
        Timer
    },
    props: {
        audioData: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            mediaBtnIcon: audioActions.PLAY,
            timer: null,
            showTimer: false,
            countDown: true,
            audio: null,
            startTimerAt: 0
        }
    },
    created () {
        this.audio = this.audioData.audio
        this.startTimerAt = this.audioData.duration
        this.showTimer = true
    },
    methods: {
        playHandler () {
            this.audioData.audio.play()
            this.$refs.timer.start()
        },
        pauseHandler () {
            this.audioData.audio.pause()
            this.$refs.timer.stop()
        },
        countDownFinishHandler () {
            this.$refs.timer.stop()
            this.$refs.timer.resetTimer()
            this.$refs.mediaButton.action = audioActions.PLAY
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
