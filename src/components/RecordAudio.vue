<template>
  <div>
    <timer
      v-show="showTimer"
      ref="timer"
      :start-at="startTimerAt"
      @time-restriction="timeRestrictionHandler"/>

    <media-button
      ref="mediaButton"
      :name="mediaBtnIcon"
      @rec="recHandler"
      @stop="stopHandler" />
  </div>
</template>

<script>
/*eslint-disable */
import recorderService from '../util/audioService'
import MediaButton from './MediaButton.vue'
import Timer from './Timer.vue'
import { audioActions, SAVE_AUDIO } from '../config/constants';

export default {
    components: {
        MediaButton,
        Timer
    },
    data () {
        return {
            showTimer: true,
            startTimerAt: 0.00,
            timer: null,
            mediaButton: null,
            recorder: null,
            audioData: null,
            btnText: 'Save',
            mediaBtnIcon: audioActions.REC,
        }
    },
    methods: {
        recHandler () {
            const handleAction = async () => {
                this.recorder = await recorderService.recorder()
                this.recorder.start()
                this.$refs.timer.start()
            }

            if (this.audioData !== null) {
                this.$refs.timer.resetTimer()
            }

            handleAction()
            this.$emit('on-start')
        },
        stopHandler () {
            this.recorder.stop().then(async (data) => {
                this.audioData = data
                this.$refs.timer.stop()
                this.audioData.duration = this.$refs.timer.getLastTime()
                this.$emit('on-stop', this.audioData)
            })
        },
        timeRestrictionHandler () {
            this.$refs.mediaButton.$el.click()
            this.$refs.timer.mili = 0
        },
        saveHandler () {
            const reader = new FileReader()
            reader.readAsDataURL(this.audioData.audioBlob)
            reader.onloadend = () => {
                const binary = reader.result
                const duration = this.$refs.timer.getLastTime()
                this.$store.dispatch(SAVE_AUDIO, { binary, duration }).then((resp) => {
                    URL.revokeObjectURL(this.audioData.audioUrl)
                    this.$router.push(`/${resp.hash}`)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
