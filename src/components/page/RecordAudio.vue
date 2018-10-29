<template>
  <div class="full-width">
    <timer
      v-show="showTimer"
      ref="timer"
      :start-at="startTimerAt" />

    <span
      :class="{ 'disabled': !audioData }"
      class="copy-link-btn"
      @click="saveClickHandler">{{ btnText }}</span>

    <media-button
      name="rec"
      @rec="recHandler"
      @stop="stopHandler" />
  </div>
</template>

<script>
import recorderService from '../../util/audioService'
import MediaButton from '../MediaButton.vue'
import Timer from '../Timer.vue'
import { SAVE_AUDIO } from '../../config/constants'

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
            recordedTime: '',
            recorder: null,
            audioData: null,
            btnText: 'Save',
            testTime: null
        }
    },
    methods: {
        recHandler () {
            const handleAction = async () => {
                this.recorder = await recorderService.recorder()
                this.recorder.start()
                this.$refs.timer.start()
                this.testTime = new Date()
            }

            handleAction()
        },
        stopHandler () {
            this.recorder.stop().then(async (data) => {
                this.audioData = data
                this.audioData.play()
            })

            this.$refs.timer.stop()
            this.recordedTime = this.$refs.timer.getLastTime()
        },
        saveClickHandler () {
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
    .full-width {
        width: 100%;
    }
    .copy-link-btn {
        background-image: -webkit-linear-gradient(top, #edecec, #cecbc9);
        background-image: linear-gradient(top, #edecec, #cecbc9);
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 1px 1px rgba(204, 198, 197, 0.5);
        cursor: pointer;
        width: 120px;
        padding: 5px;
        margin: 0 auto 40px;
        display: flex;
        justify-content: center;
        line-height: 32px;
        font-size: 22px;
        border: 1px solid #bfbfbf;
        &:active {
            box-shadow: inset 0px -3px 1px 1px rgba(204,198,197,.5);
            background-image: none;
            border: 1px solid #7d7d7d;
        }

        &.disabled {
            visibility: hidden;
        }
    }
</style>
