<template>
  <div class="full-width">
    <timer
      v-show="showTimer"
      ref="timer" />

    <span
      :class="{ 'disabled': !audioData }"
      class="copy-link-btn"
      @click="copyAudioLinkHandler">{{ copyBtnText }}</span>

    <div class="action-btn">
      <media-button
        name="Record"
        @rec="recHandler"
        @stop="stopHandler" />
    </div>
  </div>
</template>

<script>
import documentAction from './util/clipboard'
import recorderService from './util/recordAudio'
import MediaButton from './components/MediaButton.vue'
import Timer from './components/Timer.vue'

export default {
    components: {
        MediaButton,
        Timer
    },
    data () {
        return {
            showTimer: true,
            timer: null,
            recordedTime: '',
            recorder: null,
            audioData: null,
            copyBtnText: 'Copy link'
        }
    },
    methods: {
        recHandler () {
            const handleAction = async () => {
                this.recorder = await recorderService.recorder()
                this.recorder.start()
                this.$refs.timer.start()
            }

            handleAction()
        },
        stopHandler () {
            this.recorder.stop().then((res) => {
                this.audioData = res
                console.log(res)
                res.play()
            })

            this.$refs.timer.stop()
            this.recordedTime = this.$refs.timer.getLastTime()
        },
        copyAudioLinkHandler () {
            documentAction.copyTextToClipboard(this.audioData.audioUrl)
            this.copyBtnText = 'Copied!'
        }
    }
}
</script>

<style lang="scss" scoped>
    .full-width {
        width: 100%;
    }
    .timer {
        width: 235px;
        font-size: 250px;
        /*display: flex;*/
        /*justify-content: center;*/
        margin: 20px auto 40px;
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
    .action-btn {
        width: 100%;
        display: flex;
        align-items: flex-end;
        margin: 0 auto;
    }
</style>
