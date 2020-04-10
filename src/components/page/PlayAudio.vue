<template>
  <div class="full-width">
    <timer
      v-if="showTimer"
      ref="timer"
      :count-down="countDown"
      :start-at="startTimerAt"
      @countdown-finish="countDownFinishHandler" />
    <span
      class="copy-link-btn"
      @click="copyLinkClickHandler">{{ btnText }}</span>

    <media-button
      ref="mediaButton"
      :name="mediaBtnIcon"
      @play="playHandler"
      @pause="pauseHandler" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import audioService from '../../util/audioService'
import documentAction from '../../util/clipboard'
import { audioActions, LOAD_AUDIO } from '../../config/constants'
import MediaButton from '../MediaButton.vue'
import Timer from '../Timer.vue'

export default {
    components: {
        MediaButton,
        Timer
    },
    data () {
        return {
            btnText: 'Copy link',
            mediaBtnIcon: audioActions.PLAY,
            audioData: null,
            timer: null,
            showTimer: false,
            countDown: true,
            audio: null,
            startTimerAt: 0
        }
    },
    computed: {
        ...mapGetters(['get_loaded_audio', 'get_base_url'])
    },
    created () {
        this.getAudioData().then(async (data) => {
            const blob = audioService.dataURIToBlob(data.binary)
            const audioUrl = URL.createObjectURL(blob)
            this.audio = new Audio(audioUrl)
            this.startTimerAt = parseFloat(data.duration)
            this.showTimer = true
        })
    },
    methods: {
        getAudioData () {
            return this.$store.dispatch(LOAD_AUDIO, this.$route.params.hash)
        },
        copyLinkClickHandler () {
            documentAction.copyTextToClipboard(window.location.origin + this.$route.fullPath)
            this.btnText = 'Copied!'

            setTimeout(() => {
                this.btnText = 'Copy link'
            }, 1000)
        },
        playHandler () {
            this.audio.play()
            this.$refs.timer.start()
        },
        pauseHandler () {
            this.audio.pause()
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
  .full-width {
    width: 100%;
  }
  .copy-link-btn {
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
</style>
