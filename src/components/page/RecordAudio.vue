<template>
  <div class="full-width">
    <timer
      v-show="showTimer"
      ref="timer"
      :start-at="startTimerAt"
      :count-down="countDown"
      @countdown-finish="countDownFinishHandler"
      @time-restriction="timeRestrictionHandler"/>

    <span
      :class="{ 'disabled': !audioData }"
      class="save-btn"
      @click="saveHandler">{{ btnText }}</span>

    <media-button
      ref="mediaButton"
      :name="mediaBtnIcon"
      @play="playHandler"
      @pause="pauseHandler"
      @rec="recHandler"
      @stop="stopHandler" />
  </div>
</template>

<script>
/*eslint-disable */
import recorderService from '../../util/audioService'
import MediaButton from '../MediaButton.vue'
import Timer from '../Timer.vue'
import { audioActions, SAVE_AUDIO } from '../../config/constants';

export default {
    components: {
        MediaButton,
        Timer
    },
    data () {
        return {
            showTimer: true,
            startTimerAt: 0.00,
            countDown: false,
            timer: null,
            mediaButton: null,
            recordedTime: '',
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
        },
        stopHandler () {
            this.recorder.stop().then(async (data) => {
                this.audioData = data
                this.startTimerAt = this.$refs.timer.getLastTime()
                this.$refs.mediaButton.action = audioActions.PLAY;
            })

            this.$refs.timer.stop()
            this.countDown = true
            this.recordedTime = this.$refs.timer.getLastTime()
        },
        playHandler () {
            this.audioData.audio.play()
            this.$refs.timer.start()
        },
        pauseHandler () {
            this.audioData.audio.pause()
            this.$refs.timer.stop()
        },
        timeRestrictionHandler () {
            this.$refs.mediaButton.$el.click()
            this.$refs.timer.mili = 0
        },
        countDownFinishHandler () {
            this.$refs.timer.stop()
            this.$refs.timer.resetTimer()
            this.$refs.mediaButton.action = audioActions.PLAY
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
    .full-width {
        width: 100%;
    }
    .save-btn {
        background-image: -webkit-linear-gradient(top, #edecec, #edecec);
        background-image: linear-gradient(top, #edecec, #edecec);
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1), inset 0px -3px 1px 1px rgba(204, 198, 197, 0.1);
        cursor: pointer;
        width: 100px;
        border-radius: 7px;
        padding: 5px;
        margin: 0 auto 40px;
        display: flex;
        justify-content: center;
        line-height: 32px;
        font-size: 19px;
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
    .action-btn {
      display: flex;
    }
</style>
